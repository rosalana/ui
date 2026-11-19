import { section, type Article } from "../schema";

export default {
  title: "useAuth",
  description: "Read the authenticated user from Inertia page props.",
  sections: [
    section(
      "usage",
      "Usage",
      "useAuth reads auth.user from the Inertia page props. user is a computed ref that updates whenever Inertia replaces the props, for example after a login or a profile edit. isAuthenticated is a function that tells whether there is a user right now.",
      `import { useAuth } from '@rosalana/ui';

const { user, isAuthenticated } = useAuth();

// In the template refs are unwrapped:
//   <p v-if="isAuthenticated()">Signed in as {{ user.name }}</p>
// In script use the value:
//   user.value?.name`,
    ),
    section(
      "backend",
      "What the backend has to share",
      "The composable expects the shared Inertia data to contain auth.user, which is the authenticated user or null for a guest. With Laravel this lives in HandleInertiaRequests::share. Without that prop, user is undefined and isAuthenticated() returns false.",
      `// app/Http/Middleware/HandleInertiaRequests.php
public function share(Request $request): array
{
    return [
        ...parent::share($request),
        'auth' => ['user' => $request->user()],
    ];
}`,
      "php",
    ),
    section(
      "typed-user",
      "Your application's user type",
      "The user is typed loosely by the library. When you need the concrete fields of your application's user, read the same prop with useComputedPage and your own type. Checking the user in the UI only changes what is shown; authorization has to be enforced on the server.",
      `const user = useComputedPage<{
  id: number;
  name: string;
  email: string;
} | null>('auth.user');`,
    ),
  ],
} satisfies Article;
