import { section, type Article } from "../schema";

export default {
  title: "useConfirm",
  description:
    "Await confirmation, typed matching or asynchronous verification.",
  sections: [
    section(
      "usage",
      "Usage",
      "The plugin mounts the dialog once for the whole app. confirm, match and verify each open it and return a promise of a boolean: true when the user confirmed, false when they cancelled. Pass a title as a string, or an options object with description, icon, confirm and cancel labels and danger, which styles the confirm button as destructive.",
      `import { useConfirm } from '@rosalana/ui';

const { confirm, match, verify } = useConfirm();

async function removeTeam() {
  if (!(await confirm('Remove the Falcons?'))) return;
  // Perform the confirmed action here.
}`,
    ),
    section(
      "match",
      "Typing a phrase",
      "match adds an input and enables the confirmation only once the user types exactly the given phrase, for actions that can't be undone, like deleting a tournament. It takes the options plus match and an optional placeholder.",
    ),
    section(
      "verify",
      "Verifying with a callback",
      "verify adds an input too, but the check is yours: callback receives what the user typed and returns a promise of a boolean. The confirm button shows a spinner while it runs and the input turns red when it returns false, so the dialog stays open for another try. Set password to hide what is typed. Use it for a password check or a code.",
      `const verified = await verify({
  title: 'Transfer ownership',
  password: true,
  callback: (password) => api.checkPassword(password),
});`,
    ),
    section(
      "concurrency",
      "One active dialog",
      "The confirmation state is shared by the whole app. Await one confirmation before opening another, so a second request does not replace the active resolver.",
    ),
  ],
  examples: [
    {
      file: "Confirm",
      title: "Confirm an action",
      description:
        "A destructive confirmation with its own labels and icon, and the shortest form with just a title.",
    },
    {
      file: "Match",
      title: "Type the name to confirm",
      description: "Deleting the tournament needs its exact name.",
    },
    {
      file: "Verify",
      title: "Verify with a password",
      description:
        "The callback checks the password asynchronously. The right one in this demo is tigers.",
    },
  ],
} satisfies Article;
