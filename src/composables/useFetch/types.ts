export type UseFetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | 'get' | 'post' | 'put' | 'delete';
    headers?: Record<string, string>;
    body?: any;
}