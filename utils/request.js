import axios from 'axios';
import Vue from 'vue';
const request = axios.create({
    timeout: 20000,
});

// 增加响应拦截
request.interceptors.response.use(
    function (response) {
        // console.log(response);

        const {data, code,message} = response.data

        // console.log(data, code,message);
        // debugger
        if (code === '0') {
            return data;
        } else {
            return  Promise.reject(message)
        }
    },
    function (error) {
        return Promise.reject(error);
    },
);


Vue.prototype.$request = request;