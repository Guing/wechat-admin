
import axios from '../plugins/axios'

export default {
    getAi() {
        return axios.get(`/ai/`, { loading: true });
    },
    updateAi(data:object) {
        return axios.put(`/ai/`,data, { loading: true });
    },
    delAi() {
        return axios.delete(`/ai/`, { loading: true });
    },
    setAi(data:object) {
        return axios.post(`/ai/`, data,{ loading: true });
    },
}