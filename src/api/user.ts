
import axios from '../plugins/axios'

export default {
    login(data: object) {
        return axios.post('/user/access/login', data, { loading: true });
    },
    loginOut(data: object = {}) {
        return axios.post('/user/access/logout', data, { loading: true });
    }
}