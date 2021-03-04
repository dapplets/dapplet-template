# Create viewport adapter

In this example we create a new viewport adapter and a dapplet for it.

Here is the initial code for this example: [ex09-new-viewport-adapter-exercise.](https://github.com/dapplets/dapplet-template/tree/ex09-new-viewport-adapter-exercise)

Our template has an adapter:

```bash
adapter
├── .gitignore
├── dapplet.json
├── index.json
├── package.json
├── package-lock.json
└── styles
    └── body
        └── button.css
```

When you create an adapter don't forget to set **`contextIds`** in `/adapter/dapplet.json`. On these sites, the adapter will work:

```json
{
  "contextIds": [
    "twitter.com",
    "instagram.com",
    "www.instagram.com",
    "youtube.com",
    "www.youtube.com",
    "dapplets.org",
    "github.com",
    "google.com",
    "www.google.com",
    "facebook.com",
    "www.facebook.com",
    "x.com",
    "www.x.com"
  ]
}
```

1. Implement a parser configuration for the adapter in `/adapter/index.json` to determine widget insertion points and parse some common data for the dapplet. Let's insert a widget into the top level of the html and get the page title information. Don’t forget to set the ID for the context:

```ts
 "contexts": {
    "GLOBAL": {
        "containerSelector": "html",
        "contextBuilder": {
            "id": "string('global')",
            "websiteName": "string(//title)"
        }
    },
    "BODY": {
        "containerSelector": "html",
        "contextSelector": "",
        "widgets": {
            "button": {
                "styles": "",
                "insertionPoint": "",
                "insert": ""
            }
        },
        "contextBuilder": {
            "id": "string('global')",
            "websiteName": "string(//title)"
        }
    }
}
```

2. Specify the widget's insertion point and provide the path to its styles:

```ts
"button": {
    "styles": "styles/body/button.css",
    "insertionPoint": "body",
    "insert": "end"
}
```

3. Change `dependencies` and `contextIds` in `/dapplet-feature/dapplet.json` to new adapter:

```json
{
  "contextIds": ["example-viewport-adapter.dapplet-base.eth"],
  "dependencies": {
    "example-viewport-adapter.dapplet-base.eth": "0.2.0"
  }
}
```

5. Add a valid adapter in `/dapplet-feature/src/index.ts`:

```ts
@Inject('example-viewport-adapter.dapplet-base.eth')
public adapter: any;
```

6. Add `button` from the page in `BODY`:

```ts
button({
  initial: 'DEFAULT',
  id: 'button',
  DEFAULT: {
    label: 'GOOGLE_EXAMPLE',
    img: EXAMPLE_IMG,
    exec: () => {},
  },
})
```

7. On button click show the website name:

```ts
exec: () => Core.alert(ctx.websiteName)
```

Here is the result: [ex09-new-viewport-adapter-solution.](https://github.com/dapplets/dapplet-template/tree/ex09-new-viewport-adapter-solution)

Run the dapplet:

```bash
npm i
npm start
```

> In this example we run **two servers** concurrently. So you have to add two registry addresses to Dapplet extension in Development tab. Click [here](https://docs.dapplets.org/docs/get-started#11-connect-the-development-server-to-dapplet-extension) for instructions.

![](https://github.com/dapplets/dapplet-docs/blob/master/static/video/ex_9.gif)

This page in the docs is [here.](https://docs.dapplets.org/docs/create-viewport-adapter)
