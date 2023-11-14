import {$fetch, FetchError} from "ofetch";
import {parseCookies} from "h3";

const CSRF_COOKIE = "XSRF-TOKEN";
const CSRF_HEADER = "X-XSRF-TOKEN";

export const $larafetch = $fetch.create({
    credentials: "include",
    async onRequest({request, options}) {
        const {backendUrl, frontendUrl} = useRuntimeConfig().public;
        const event = process.nitro ? useEvent() : null;
        let token = event
            ? parseCookies(event)[CSRF_COOKIE]
            : useCookie(CSRF_COOKIE).value;

        // on client initiate a csrf request and get it from the cookie set by laravel
        if (
            process.client &&
            ["post", "delete", "put", "patch"].includes(
                options?.method?.toLowerCase() ?? ""
            )
        ) {
            token = await initCsrf();
        }

        let headers: any = {
            accept: "application/json",
            ...options?.headers,
            ...(token && {[CSRF_HEADER]: token}),
        };

        if (process.server) {
            const cookieString = event
                ? event.headers.get("cookie")
                : useRequestHeaders(["cookie"]).cookie;

            headers = {
                ...headers,
                ...(cookieString && {cookie: cookieString}),
                referer: frontendUrl,
            };
        }

        options.headers = headers;
        options.baseURL = backendUrl;
    },
    async onResponseError({response}) {
        if ([500].includes(response.status)) {
            console.error("[Laravel Error]", response.statusText, response._data);
        }
        if ([419].includes(response.status)) {
            await refreshCsrf()
        }
    },
});

async function initCsrf() {
    return useCookie(CSRF_COOKIE).value || await refreshCsrf();
}

async function refreshCsrf() {
    const {backendUrl} = useRuntimeConfig().public;

    await $fetch("/sanctum/csrf-cookie", {
        baseURL: backendUrl,
        credentials: "include",
    });

    return useCookie(CSRF_COOKIE).value;
}
