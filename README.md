# Example 8: New Site specific adapter

In this example we implement an adapter for Google Search and a dapplet for it.

Here is the initial code for this example: [ex08-new-adapter-exercise.](https://github.com/dapplets/dapplet-template/tree/ex08-new-adapter-exercise)

The adapter and the dapplet are divided into two directories: `/adapter` and `/dapplet-feature`.

## Create an adapter with one widget `button` for two contexts.

At the beginning we change the adapter template. Let's add buttons under each element’s title of standard Google search results and one button in the top navigation bar.

In `adapter/src/index.ts` implement **`config`**. It is an object which describes different **contexts** on the page. Selectors for container, context data and insertion points for widgets are described here. `contextBuilder` defines context information that widget receives in these context types: `MENU` and `SEARCH_RESULT` in our case (named **`ctx`** in our examples).

```ts
public config = {
  MENU: {
    containerSelector: '#cnt, .ndYZfc',
    contextSelector: '#top_nav, .jZWadf',
    insPoints: {
      MENU: {
        selector: '.MUFPAc, .T47uwc',
        insert: 'inside',
      },
    },
    contextBuilder: (): ContextBuilder => ({
      id: '',
      insertPoint: '#rcnt, .mJxzWe',
    }),
  },
  SEARCH_RESULT: {
    containerSelector: '#search',
    contextSelector: '#rso > .g .jtfYYd, #rso > div > .g .jtfYYd, #rso > div > div > .g .jtfYYd',
    insPoints: {
      SEARCH_RESULT: {
        selector: '.yuRUbf',
        insert: 'inside',
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contextBuilder: (searchNode: any): ContextBuilder => ({
      id: searchNode.querySelector('.yuRUbf > a')?.href,
      title: searchNode.querySelector('h3')?.textContent,
      link: searchNode.querySelector('.yuRUbf > a')?.href,
      description: searchNode.querySelector('.uUuwM')?.textContent || searchNode.querySelector('.IsZvec')?.textContent,
    }),
  },
```

**How to create an adapter's config?**

Now we could talk about site-specific adapters. It means that dapplets using this adapter interact with some specific website.
It also means that we should **use the website's HTML structure** to add our widgets to certain parts of the pages.

The idea of **separating adapters from dapplets** is to provide **dapplets' developers** with a simple interface to add their augmentations (we call them widgets) to existing pages.
This way, **dapplets developers** don't need to worry about how to add their code in certain places or how to parse different blocks of information on the page. They get the template, customize it and add the behavior they need.

The goals of the **adapters' developer** are to create this template, define the data that can be parsed from the context, that can be useful in the dapplet.
**Adapters' developer** also need to describe exact places on the pages where the widgets will be inserted. To describe them we use valid CSS selectors that can be used in the Document method `querySelector()`.

For example, let's look at the Google Search page. Enter some search query, `clouds` for example.
Look at the structure of the page in the browser's developer tools, Elements tab.
There you can find the block with `search` id, that contains all the main search results.
It will be our **containerSelector** where we will search some separate results.

```js
document.querySelector('#search')
▸ <div id="search">…</div>
```

Then try to pick out the selectors' chain that provides access to separate context — **contextSelector**.
You can choose relevant selectors manually or you can left click on the element in the Elements tab and choose Copy selector.
In most cases the selector has to be edited.

```js
document.querySelectorAll('#search #rso > .g .jtfYYd')
▸ NodeList(6) [div.jtfYYd, div.jtfYYd, div.jtfYYd, div.jtfYYd, div.jtfYYd, div.jtfYYd]
```

In some cases there are several relevant selectors for different places on the page or different pages. In this case you can define them separating by using commas.

```js
document.querySelectorAll('#search #rso > .g .jtfYYd, #rso > div > .g .jtfYYd, #rso > div > div > .g .jtfYYd')
▸ NodeList(11) [div.jtfYYd, div.jtfYYd, div.jtfYYd, div.jtfYYd, div.jtfYYd, div.jtfYYd, div.jtfYYd, div.jtfYYd, div.jtfYYd, div.jtfYYd, div.jtfYYd]
```

Make sure not to include unwanted blocks.

Using the same method define selectors for insertion points — exact places where the widgets will be placed.
There are 3 insert options: `end`, `start` and `inside`. The first one is default.

```typescript
insPoints: {
  SEARCH_RESULT: {
    selector: '.yuRUbf',
    insert: 'inside',
  },
},
```

Also in the **contextBuilder** you have to get all the properties for the context. There is a function that receives the node given by the **contextSelector**.

```typescript
contextBuilder: (searchNode: any): ContextBuilder => ({
  id: searchNode.querySelector('.yuRUbf > a')?.href,
  title: searchNode.querySelector('h3')?.textContent,
  link: searchNode.querySelector('.yuRUbf > a')?.href,
  description: searchNode.querySelector('.uUuwM')?.textContent || searchNode.querySelector('.IsZvec')?.textContent,
}),
```

**!!** Note that websites can be changed and you will get errors trying to get properties when the nodes will not be found.

It is assumed that **all interactions with DOM** happen in the adapters and not in the dapplets.

So let's go back to our exercise.

Now we have two contexts: **MENU** and **SEARCH_RESULT**.

If there are many contexts of the same type on the page, like tweets or search results, you have to find a **unique** `id` for each one. It's needed for saving the states of dapplets' widgets connected to these contexts.

The next step - is creating a **widget**. We have a template of the button in `adapter/src/button.ts`.

To define the contexts in which this widget is used, you must specify `contextInsPoints`.

For example, let's define the contexts for `MENU` and `SEARCH_RESULT`

```ts
public static contextInsPoints = {
  MENU: 'MENU',
  SEARCH_RESULT: 'SEARCH_RESULT',
}
```

Let's implement at the public method **`mount`** of the class `Button` the HTML with **`label`**, **`image`** and **`tooltip`** for our insertion points `MENU` and `SEARCH_RESULT`.

> Adapters allow the dapplet to **customize** the widgets. This can be the `text` of the button, the `image` on the icon, the choice of one of the `location` options, etc. The adapter developer decides what **parameters** to make customizable. They should be described in the documentation as follows: parameter's `name`, `mandatory` or not, data `TYPE`, text `description`. If you need to select one of several value options for a parameter, they must be listed (this can be specified in the parameter type). If the parameter type is a number, then it is recommended to indicate in which units it will be converted: pixels, percentages, fractions, etc.

```ts
const activeNavEl: HTMLElement = document.querySelector('.hdtb-msel, .rQEFy');
if (this.insPointName === 'MENU') {
  this.el.innerHTML = `
    <div style="margin: 1px 1px 0; padding: 16px 12px 12px 10px;
      ${isActive ? 'border-bottom: 3px solid #1a73e8; ' : 'border-bottom: none; '}
      display: inline; cursor: pointer;"
      ${tooltip ? `title="${tooltip}"` : ''}
    >
      <img style="width: 20px; margin-right: 5px; margin-bottom: -3px;" src="${img}"/>
      <div style="display: inline-block; font-size: 13px; line-hight: 16px; ${
        isActive
          ? 'color: #1a73e8;'
          : '-webkit-tap-highlight-color: rgba(0,0,0,.10); color: #5f6368;'
      }">${label}</div>
    </div>
  `;
  activeNavEl.style.borderBottom = isActive ? 'none' : '3px solid #1a73e8';
} else if (this.insPointName === 'SEARCH_RESULT') {
  this.el.innerHTML = `
    <div 
      style="display: flex; align-items: center; cursor: pointer;"
      ${tooltip ? `title="${tooltip}"` : ''}
    >
      <img style="width: 20px; margin-right: 1em; margin-bottom: 3px;" src="${img}"/>
      <div style="display: inline-block; font-size: 1.1em; color: #F5504A; font-weight: bold;">${label}</div>
    </div>
  `;
}
```

Add styles for the widget depending on the context.

```ts
let stylesAdded = false;

const addStyles = (): void => {
  const styleTag: HTMLStyleElement = document.createElement('style');
  styleTag.innerHTML = `
    .dapplet-widget-menu {
      display: inline-block;
    }
    .dapplet-widget-results {
      display: block;
    }
  `;
  document.head.appendChild(styleTag);
};

...

export class Button {
  ...
  public mount(): void {
    if (!this.el) this._createElement();
    if (!stylesAdded) {
      addStyles();
      stylesAdded = true;
    }
    ...
  }
  ...
  private _createElement() {
    this.el = document.createElement('div');
    if (this.insPointName === 'MENU') {
      this.el.classList.add('dapplet-widget-menu');
    } else if (this.insPointName === 'SEARCH_RESULT') {
      this.el.classList.add('dapplet-widget-results');
    }
    ...
  }
}
```

Then change the dapplet.

Add buttons to search results and top navigation bar in `/dapplet-feature/src/index.ts`.

Implement an alert that would be triggered when you click the search results button.
The alert should contain the **title**, the **link** to the source and
a **short description** of the found fragment from the element.

```ts
exec: () => {
  const { title, link, description } = ctx;
  alert(`  title: ${title}\n  link: ${link}\n  description: ${description}`);
},
```

Implement two states for the top navigation bar button. Actions: replace search results with `HI_GIF` and return to default results.

```ts
button({
  initial: 'RESULTS',
  RESULTS: {
    label: 'Hi',
    img: GRAY_IMG,
    tooltip: 'Hi, friend!',
    isActive: false,
    exec: (_, me) => {
      const el = document.querySelector(ctx.insertPoint);
      el.style.display = 'none';
      if (!('replacedEl' in ctx)) {
        ctx.replacedEl = document.createElement('div');
        ctx.replacedEl.style.justifyContent = 'center';
        const elImg = document.createElement('img');
        elImg.src = `${HI_GIF}`;
        ctx.replacedEl.appendChild(elImg);
        el.parentElement.appendChild(ctx.replacedEl);
      }
      ctx.replacedEl.style.display = 'flex';
      me.state = 'FRIENDS';
    },
  },
  FRIENDS: {
    label: 'Hi',
    img: GOOGLE_IMG,
    tooltip: 'Go to results',
    isActive: true,
    exec: (_, me) => {
      const el = document.querySelector(ctx.insertPoint);
      el.style.display = 'block';
      ctx.replacedEl.style.display = 'none';
      me.state = 'RESULTS';
    },
  },
}),
```

Here is the result of this part: [ex08.1-new-adapter-solution.](https://github.com/dapplets/dapplet-template/tree/ex08.1-new-adapter-solution)

Run the dapplet:

```bash
npm i
npm start
```

> In this example we run **two servers** concurrently. So you have to add two registry addresses to the Dapplet extension in the Development tab. Click [here](https://docs.dapplets.org/docs/get-started#11-connect-the-development-server-to-dapplet-extension) for instructions.

## Add a widget `result` to the adapter with one context insertion point

Add new context **`WIDGETS`**. `insPoint` should be on the top of Google widgets like _Videos_, _Images of ..._, _People also ask_ etc.

Complete **config** in `/adapter/src/index.ts`:

```ts
public config = {
  ...
  WIDGETS: {
    containerSelector: '#search',
    contextSelector: '#rso',
    insPoints: {
      WIDGETS: {
        selector: '.ULSxyf',
        insert: 'begin',
      },
    },
    contextBuilder: (): ContextBuilder => ({
      id: '',
    }),
  },
}
```

Add a new context **`DAPPLET_SEARCH_RESULT`**, which is similar to `SEARCH_RESULT`
but adds a button to our search widget. This is done to prevent overwriting of similar search results from different sources.

```ts
public config = {
  ...
  DAPPLET_SEARCH_RESULT: {
    containerSelector: '#search',
    contextSelector: '.hlcw0c-dapp .tF2Cxc',
    insPoints: {
      DAPPLET_SEARCH_RESULT: {
        selector: '.yuRUbf',
        insert: 'inside',
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contextBuilder: (searchNode: any): ContextBuilder => ({
      id: searchNode.querySelector('.yuRUbf > a').href,
      title: searchNode.querySelector('h3 > span').textContent,
      link: searchNode.querySelector('.yuRUbf > a').href,
      description: searchNode.querySelector('.IsZvec').textContent,
    }),
  }
```

Don't forget to add `DAPPLET_SEARCH_RESULT` to `contextInsPoints` as in the example above.

Implement module `adapter/src/result.ts` that exports class **`Result`**.
It should have an **image**, a **title** and an artificial list of **results**.

See the code of [result.ts](https://github.com/dapplets/dapplet-template/blob/ex08.2-new-adapter-widget-solution/adapter/src/result.ts)

Import and add **Result** to `/adapter/src/index.ts`:

```ts
import { Result } from './result';
...
@Injectable
export default class GoogleAdapter {
  public exports = (): Exports => ({
    button: this.adapter.createWidgetFactory(Button),
    result: this.adapter.createWidgetFactory(Result),
  });
  ...
}
```

In `dapplet-feature/src/index.ts` add **`result`** to **`WIDGETS`**. Use `searchResults` from the template as a content source.

```ts
WIDGETS: () =>
  result({
    initial: 'DEFAULT',
    DEFAULT: {
      img: GOOGLE_IMG,
      title: 'clouds',
      searchResults,
    },
  }),
```

```ts
const searchResults = [
  {
    title: 'Types of Clouds | NOAA SciJinks - All About Weather',
    link: 'https://scijinks.gov/clouds/',
    description:
      'Mammatus clouds. Mammatus clouds are actually altocumulus, cirrus,\
      cumulonimbus, or other types of clouds that have these pouch-like shapes hanging \
      out of the bottom. The pouches are created when cold air within the cloud sinks down \
      toward the Earth. Weather prediction: Severe weather might be on its way!',
  },
  {
    title: 'Clouds—facts and information - Science',
    link: 'https://www.nationalgeographic.com/science/article/clouds-1',
    description:
      'Altostratus clouds may portend a storm. Nimbostratus clouds are thick \
      and dark and can produce both rain and snow. Low clouds fall into four divisions: \
      cumulus, stratus, cumulonimbus, and ...',
  },
  {
    title: 'Types of Clouds | Live Science',
    link: 'https://www.livescience.com/29436-clouds.html',
    description:
      'Clouds of great vertical development: These are the cumulonimbus clouds, \
      often called a thunderhead because torrential rain, vivid lightning and thunder come \
      from it. The tops of such clouds may ...',
  },
];
```

Implement the insertion of buttons into our widget.

```ts
DAPPLET_SEARCH_RESULT: (ctx) =>
  button({
    initial: 'DEFAULT',
    DEFAULT: {
      label: 'Get data',
      tooltip: 'Show in the alert',
      img: EXAMPLE_IMG,
      exec: () => {
        const { title, link, description } = ctx;
        alert(`  title: ${title}\n  link: ${link}\n  description: ${description}`);
      },
    },
  }),
```

Add support for `DAPPLET_SEARCH_RESULT` context to `adapter/src/button.ts`.

```ts
// class Button
...
public static contextInsPoints = {
  MENU: 'MENU',
  SEARCH_RESULT: 'SEARCH_RESULT',
  DAPPLET_SEARCH_RESULT: 'DAPPLET_SEARCH_RESULT',
}
...
public mount(): void {
  ...
  if (this.insPointName === 'MENU') {
    ...
  } else if (
    this.insPointName === 'SEARCH_RESULT' ||
    this.insPointName === 'DAPPLET_SEARCH_RESULT'
  ) {
    ...
  }
}
...
private _createElement() {
  ...
  if (this.insPointName === 'MENU') {
    this.el.classList.add('dapplet-widget-menu');
  } else if (
    this.insPointName === 'SEARCH_RESULT' ||
    this.insPointName === 'DAPPLET_SEARCH_RESULT'
  ) {
    this.el.classList.add('dapplet-widget-results');
  }
  ...
}
```

Here is the result: [ex08.2-new-adapter-widget-solution.](https://github.com/dapplets/dapplet-template/tree/ex08.2-new-adapter-widget-solution)

Run the dapplet:

```bash
npm i
npm start
```

To see the full result, please enter `clouds` into Google

This page in the docs is [here.](https://docs.dapplets.org/docs/new-site-adapter)
