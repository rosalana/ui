# Run

To run this locally for testing, run:

```
npm install
```

Then link the package globally:

```
npm link
```

Then in your project:

```
npm link @rosalana/ui
```

Than build the library and watch for changes for `js` files:

```
npm run dev:vite
```

And for `d.ts` files:

```
npm run dev:tsc
```

When `npm link` is not available, you can add the file directly to your `package.json`:

```json
"@rosalana/ui": "file:../path-to-rosalana-ui"
```

Or run `npm pack` in the `@rosalana/ui` folder and install the generated tarball in your project.

It makes somethings link `rosalana-ui-0.1.0.tgz` and then install it in your project:

```
npm install ../path-to-rosalana-ui/rosalana-ui-0.1.0.tgz
```

This simulates a real package installation.

TODO: OPRAVIT TYPOVANI VUE KOMPONENT
