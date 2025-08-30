import { User } from "../plugin/types";

// zazim jen idea...

type CreateModelOptions<T> = Record<string, Promise<T> | Promise<T>[]>;


export default function createModel<T>(methods: CreateModelOptions<T>): Record<string, Promise<T> | Promise<T>[]> {
    return methods;
}

const user = {
    get() {
        return Promise.resolve({ id: 1, name: "John Doe" });
    }
};

user.get()

