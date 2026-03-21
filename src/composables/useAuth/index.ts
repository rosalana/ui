import { useComputedPage } from "../useComputedPage";

export interface AuthUser {
  [key: string]: never;
}

export function useAuth() {
  const user = useComputedPage<AuthUser>("auth.user");

  return {
    user,
    isAuthenticated() {
      return !!user.value;
    },
  };
}
