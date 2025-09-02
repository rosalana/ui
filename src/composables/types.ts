export type CreateModelOptions<T> = Record<string, Promise<T> | Promise<T>[]>;

export type UseFetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | 'get' | 'post' | 'put' | 'delete';
    headers?: Record<string, string>;
    body?: any;
}