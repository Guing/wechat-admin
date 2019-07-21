
import axios from '../plugins/axios'

export default {
    login(parmas: object) {
        return axios.post('/user/access/login', parmas);
    }
}