import Vue from 'vue'
declare module 'vue/types/vue' {
    interface Vue {
        $api: {
            [key: string]: {
                [key: string]: (data?: object, options?: object) => Promise<any>
            }
        }
    }
}

declare global {
    interface TableFilterConfig {
        name: string;
        domType?: string;
        type?: string;
        label?: string;
        placeholder?: string;
        options?: object[];
        siblings?: TableFilterConfig[];
    }
}



