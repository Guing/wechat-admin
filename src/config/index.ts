
const isProd = process.env.NODE_ENV === 'production';
export default {
    baseURL: isProd?'http://wechat.blackfe.com/api':'http://localhost:7001/api'
}