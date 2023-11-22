import {FetchError} from "ofetch";

export const laravelError = ref<any>(null);

export default defineNuxtPlugin(async (nuxtApp) => {
    nuxtApp.hook("vue:error", (error, instance, info) => {
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
            default:
                laravelError.value = (error.response?._data?.message)
                setTimeout(
                    () => laravelError.value = null,
                    3000
                )
        }
        // if ([401, 419].includes(status)) {
        //     navigateTo("/login");
        // }
        //
        // if ([409].includes(status)) {
        //     navigateTo("/verify-email");
        // }
        //
        // if ([500].includes(status)) {
        //     laravelError.value = (error.response?._data?.message)
        //     setTimeout(
        //         () => laravelError.value = null,
        //         3000
        //     )
        //
        // }
    });
});
