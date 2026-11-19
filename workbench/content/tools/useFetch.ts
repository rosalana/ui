import { section, type Article } from "../schema";

export default {
  title: "useFetch",
  description: "A small Axios JSON request helper that sends credentials.",
  sections: [
    section(
      "usage",
      "Usage",
      "useFetch(url, options) sends a JSON request and resolves with the response body. The options are method (GET by default, POST, PUT or DELETE), headers and body. It is a plain async function, not a reactive fetch object, so call it from event handlers or inside your own state handling.",
      `import { useFetch } from '@rosalana/ui';

const teams = await useFetch('/teams');

const created = await useFetch('/teams', {
  method: 'POST',
  body: { name: 'Falcons' },
});`,
    ),
    section(
      "request",
      "What it sends",
      "Requests go to the same origin (the base URL is /) with credentials, so the session cookie travels with them. The headers are Accept: application/json, Content-Type: application/json and X-Requested-With: XMLHttpRequest, and the headers option is merged over them. The body is serialized as JSON. This makes the Laravel backend answer with JSON instead of a redirect.",
    ),
    section(
      "errors",
      "Errors",
      "When the server answers with an error status, useFetch throws an Error whose message contains the status, for example HTTP error! status: 422. The response body, including Laravel's validation errors, is not preserved, so for forms prefer Inertia's useForm and use useFetch for lightweight requests such as lookups. A network failure is rethrown as it is. Always catch at the place where you can show feedback.",
      `async function saveTeam(name: string) {
  try {
    return await useFetch('/teams', { method: 'POST', body: { name } });
  } catch (error) {
    sonner.error('The team could not be saved.');
  }
}`,
    ),
  ],
} satisfies Article;
