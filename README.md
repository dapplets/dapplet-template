# Example 13: Dark theme support

You can add different icons for **light** and **dark** themes.

```typescript
...
this.adapter.attachConfig({
  POST_SOUTH: [
    button({
      initial: 'DEFAULT',
      DEFAULT: {
        label: 'Injected Button',
        img: {
          LIGHT: LIGHT_IMG,
          DARK: DARK_IMG,
        },
        exec: () => alert('Hello, Themes!'),
      },
    }),
  ],
});
...
```

Usually we pass to `img` a link to the image of type `string`. But we can also pass an object, that contains two links with the keys `LIGHT` and `DARK` which means for light and dark themes respectively.

This page in the docs is [here.](https://docs.dapplets.org/docs/dark-theme-support)
