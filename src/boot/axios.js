import vue from 'vue';
import axios from 'axios';

vue.prototype.$axios = axios;
// ^ ^ ^ this will allow you to use this.$axios
//       so you won't necessarily have to import axios in each vue file
// const api = axios.create({ baseURL: process.env.APP_API });
const api = axios.create({ baseURL: 'http://lininja.asuscomm.com:3000' });

vue.prototype.$api = api;
// ^ ^ ^ this will allow you to use this.$api
//       so you can easily perform requests against your app's API

export { axios, api };
