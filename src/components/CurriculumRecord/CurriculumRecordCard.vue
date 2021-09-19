<template>
  <q-list
    bordered
    class="rounded-borders"
  >
    <q-expansion-item
      icon="mdi-handball"
      :label="title"
      :default-opened="index === 0"
      group="somegroup"
    >
      <q-table
        :data="itemList"
        :columns="columns"
        row-key="name"
        hide-bottom
      >
        <template #body="props">
          <q-tr
            :props="props"
            :class="{ 'bg-blue-2': props.row.Check }"
          >
            <q-td
              key="Set"
              :props="props"
            >
              {{ props.row.Set }}
            </q-td>
            <q-td
              key="Weight"
              :props="props"
            >
              {{ props.row.Weight }}
              <q-popup-edit
                v-model="props.row.Weight"
                :disable="props.row.Check"
                buttons
              >
                <q-input
                  v-model.number="props.row.Weight"
                  type="number"
                  dense
                  autofocus
                />
              </q-popup-edit>
            </q-td>
            <q-td
              key="Reps"
              :props="props"
            >
              {{ props.row.Reps }}
              <q-popup-edit
                v-model="props.row.Reps"
                :disable="props.row.Check"
                buttons
              >
                <q-input
                  v-model="props.row.Reps"
                  type="number"
                  dense
                  autofocus
                />
              </q-popup-edit>
            </q-td>
            <q-td
              key="Note"
              :props="props"
            >
              <div class="text-pre-wrap">
                {{ props.row.Note }}
              </div>
              <q-popup-edit v-model="props.row.Note">
                <q-input
                  v-model="props.row.Note"
                  :disable="props.row.Check"
                  type="textarea"
                  dense
                  autofocus
                />
              </q-popup-edit>
            </q-td>
            <q-td
              key="Check"
              :props="props"
            >
              <q-btn
                round
                :color="props.row.Check ? 'primary' : 'grey-4'"
                icon="mdi-check-circle"
                @click="changeCheckColor(props.row)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-expansion-item>
  </q-list>
</template>

<script>
const columns = [
  {
    name: 'Set',
    field: 'Set',
    label: '組數',
    align: 'center'
  },
  {
    name: 'Weight',
    field: 'Weight',
    label: '重量',
    align: 'center'
  },
  {
    name: 'Reps',
    field: 'Reps',
    label: 'Reps',
    align: 'center'
  },
  {
    name: 'Note',
    field: 'Note',
    label: '備註',
    align: 'center'
  },
  {
    name: 'Check',
    field: 'Check',
    label: '是否完成',
    align: 'center'
  }
];

export default {
  name: 'CurriculumRecordList',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    itemList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns
    };
  },
  methods: {
    changeCheckColor(item) {
      item.Check = !item.Check;
    }
  }
};
</script>
