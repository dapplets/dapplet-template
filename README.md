# Example 12: Dark theme support

You can add different icons for **light** and **dark** themes.

Usually we pass an image encoded as `base64` to `img`. This can also be an absolute image `URL`. But we can also pass an object, that contains two images with the keys `LIGHT` and `DARK` for light and dark themes respectively.

```typescript
this.adapter.attachConfig({
  POST: () =>
    button({
      DEFAULT: {
        label: 'Injected Button',
        img: {
          LIGHT: LIGHT_IMG,
          DARK: DARK_IMG,
        },
        exec: () => Core.alert('Hello, Themes!'),
      },
    }),
})
```

![video](https://docs.dapplets.org/assets/images/ex_12-0f95107f4d32c7ad54122e19400e2f93.gif)
