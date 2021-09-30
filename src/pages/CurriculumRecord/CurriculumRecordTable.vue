<template>
  <div>
    <q-card-section class="q-pa-md q-mb-md bg-grey-2">
      <q-form
        class="row common-form q-col-gutter-md"
        @submit="search()"
        @reset="reset()"
      >
        <div class="col-12 col-md-6 col-lg-3">
          <DateTimePicker
            v-model="query.Date"
            label="執行日期"
            :datemask="dateFormat"
          />
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <SubmitButton
            icon="search"
            label="搜尋"
            size="md"
          />
        </div>
      </q-form>
    </q-card-section>
    <div class="col-12">
      <template v-for="(item, index) in curriculumRecordList">
        <CurriculumRecordCard
          :key="index"
          :item.sync="item"
          :index="index"
          :title="item.Title"
          :item-list="item.SetList"
        />
      </template>
    </div>
    <div class="col-12">
      <SubmitButton @click-submit="add()" />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import notifyLib from 'src/lib/notify.lib';
import zhTw from 'dayjs/locale/zh-tw';
import { extend } from 'quasar';
import debounce from 'debounce-promise';
import {
  dateFormat
} from 'src/const/common.const';
import curriculumRecord from 'src/services/curriculumRecord.service';
import sportRecordService from 'src/services/sportRecord.service';
import DateTimePicker from 'src/components/global/DateTimePicker.vue';
import SubmitButton from 'components/global/SubmitButton.vue';
import CurriculumRecordCard from 'src/components/CurriculumRecord/CurriculumRecordCard.vue';

dayjs.extend(weekday);
dayjs.locale(zhTw);

const today = dayjs();

const defaultQuery = {
  Date: today.format(dateFormat)
};

export default {
  name: 'CurriculumRecordTable',
  components: {
    SubmitButton,
    CurriculumRecordCard,
    DateTimePicker
  },
  data() {
    return {
      curriculumRecordList: [],
      query: extend(true, {}, defaultQuery),
      addDate: '',
      dateFormat
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    reset() {
      this.query = extend(true, {}, defaultQuery);
    },
    debounceFetchData() {
      debounce(() => {
        this.fetchData();
      }, 500)();
    },
    search() {
      this.debounceFetchData();
    },
    async fetchData(query = this.query) {
      const data = await (await curriculumRecord.getRecord(query)).data;

      this.addDate = query.Date;
      this.curriculumRecordList = data.map((record) => ({
        SportTypeId: record.SportTypeId,
        Title: this.findSportTypeName(record.SportTypeId),
        SetList: record.SetList.map((set) => ({
          ...set,
          Check: false
        }))
      }));
    },
    findSportTypeName(id) {
      return this.$store.getters['commonModule/findSportTypeName'](id);
    },
    async add() {
      if (!this.checkCompletely()) {
        this.$q.notify(notifyLib.Error('有項目尚未完成'));
        return;
      }
      const postData = [];

      this.curriculumRecordList.forEach((record) => {
        record.SetList.forEach((set) => {
          postData.push({
            Date: this.addDate.replaceAll('-', ''),
            SportTypeId: record.SportTypeId,
            Set: set.Set,
            Weight: set.Weight,
            Reps: set.Reps,
            Note: set.Note
          });
        });
      });

      const data = await (await sportRecordService.add(postData)).data;

      if (data.Success) {
        this.$q.notify(notifyLib.Success('新增成功'));
      } else {
        this.$q.notify(notifyLib.Error('新增失敗'));
        this.$q.notify(notifyLib.Error(data.Data));
      }
    },
    checkCompletely() {
      let isCheck = true;

      this.curriculumRecordList.forEach((item) => {
        const checkEmpty = item.SetList.find((set) => !set.Check || !set.Weight || !set.Reps);

        if (checkEmpty) {
          isCheck = false;
        }
      });

      return isCheck;
    }

  }
};
</script>
