

interface TableFilterConfig {
  name: string;
  domType?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  options?: object[];
  siblings?: TableFilterConfig[];
}

import Vue, { VueConstructor } from 'vue'
declare module 'vue/types/vue' {
  interface Vue {
    /**
     * api接口
     */
    $api: { 
      [key: string]: {
        [key: string]: (data?: object, options?: object) => Promise<any>
      }
    }
  }
}

