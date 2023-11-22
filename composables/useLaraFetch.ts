import type {UseFetchOptions} from "nuxt/app";

export function useLaraFetch<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
    return useFetch(url, {
        $fetch: $laraFetch,
        async onResponseError({response}) {
            const status = response.status;
            if ([500].includes(status)) {
                console.error("[Laravel Error from useLaraFetch]", response.statusText, response._data);
            }

            if ([401, 419].includes(status)) {
                navigateTo("/login");
            }

            if ([409].includes(status)) {
                navigateTo("/verify-email");
            }
        },
        ...options,
    });
}
