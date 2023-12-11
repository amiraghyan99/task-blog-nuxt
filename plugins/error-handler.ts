import {FetchError} from "ofetch";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {

        if (!(error instanceof FetchError)) throw error;

        const status = error.response?.status ?? -1;

        switch (status) {
            case 401:
            case 419:
                navigateTo("/login");
                break;
            case 409:
                navigateTo("/verify-email");
                break;
        }

    }

})


