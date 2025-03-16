const config = useRuntimeConfig();

export const http = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});
