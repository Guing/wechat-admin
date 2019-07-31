import Vue, { VueConstructor } from 'vue';
import { AxiosInstance } from 'axios';

declare global {
  interface Window {
    axios: AxiosInstance
  }
}
declare module 'axios' {
  interface AxiosRequestConfig {
    retry?: number
    enableRetry?: boolean,
    retryDelay?:number,
    loading?:boolean
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance,
  }
  interface VueConstructor {
    $axios: AxiosInstance
  }
}
