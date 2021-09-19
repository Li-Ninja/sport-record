// TODO: 把他換成 $api
import { api } from 'boot/axios';

export default {
  getRecord(postData) {
    return api.post('/Curriculum/GetRecord', postData);
  }
};
