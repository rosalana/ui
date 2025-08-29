import { usePage } from '@inertiajs/vue3';
import { User } from '../plugin/types';
import { useAppContext } from '../plugin/context';

type UserWithExtras<T> = User & T;

export default function useUser<T>(): UserWithExtras<T> | null {
    const ctx = useAppContext();
    const page = usePage().props as any;
    ctx.user = page.user || null;

    return ctx.user as UserWithExtras<T> | null;
}