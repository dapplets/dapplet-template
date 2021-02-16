# Example 16: Using Web Components

In this example you will learn how to write Web Components style widgets for adapters.

We will be using the [LitElement](https://lit.dev/) library as an example. The library has different pulgins ([lit-plugin](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin), [lit-html](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html)) for formating and highlighting syntaxis in the Visual Studio Code.

You can download and install them before starting the tutorial, or can find analogies in your favourite IDE.

The initial code for this exmple is stored in this branch: [`ex16-web-components-exercise`](https://github.com/dapplets/dapplet-template/tree/ex16-web-components-exercise). You can pull it to go through the lesson.

## Introduction to Web Components

Web Components - is a way of creating reusable custom HTML-elements while encapsulating their logic and isolating CSS-styles. This method usually presumes the use of the following specifications:

- Custom Elements allows the creation of custom HTML-elements with their own tag attribution. Technically, every custom element is a successor of the `HTMLElement` class that's declared in the web-page with the use of the \*`window.customElements.define('my-custom-element', MyCustomElement)` function.
  After declaration the element becomes available for reuse in DOM, the same as normal HTML-elements `<my-custom-element />`.

- Shadow DOM provides an isolation of CSS component styles from global styles of the parent web-page. It works in two modes (`open` and `closed`), that define whether the parent web-page has access to the component's content or not. Shadow DOM doesn't use JavaScript-context, which allows it to use general link type components between the parent page and the web-component.

- HTML Templates are special HTML-elements under the `<template>` tag. They provide a convenient opportunity to clone the template's content into a new element, by using the `template.content.cloneNode(true)` function.

This approach integrates into the adapter architecture perfectly. It enables the creation of widgets by using any compatible libraries, linters, code formatting and other instruments that facilitate the development process.

## Creating a widget

### Prerequisites

1. Clone the project template from this branch: [`ex16-web-components-exercise`](https://github.com/dapplets/dapplet-template/tree/ex16-web-components-exercise)
2. Install `npm i` dependencies. (this example differs from others by having a library`lit`)
3. Run the project `npm start`
4. Add development servers to the extension with the following addresses:
   - `http://localhost:3001/dapplet.json` (dapplet)
   - `http://localhost:3002/dapplet.json` (adapter)
5. On a [Google search result](https://www.google.com/search?q=dapplets) activate the dapplet `Example 16`.

### LP: 1. Import dependencies

First let's import to the `./adapter/src/button.ts` the necessary elements from the library Lit

```typescript
import { LitElement, html, css } from 'lit'
import { property } from 'lit/decorators.js'
```

`LitElement` - is a basic class which we will be inheriting from. It expands the native
`HTMLElement` and hides the extra template rendering, style application, and reactive state change logic.

`html` and `css` - are Tagged Template Literals, which you can use to write HTML and CSS component code. The code inside literals can be highlighted and automatically formatted with the use of the according plugins, which makes the development more convenient.

`property` - is a decorator. It can be used to make the properties of the component reactive and publically available to change from the outside. These properties will rerender the component when their values are altered.

Read more about other Lit possibilities in its [official documentation](https://lit.dev/docs/).

### LP: 2. Declare custom element class

Inherit the widget class from the `LitElement` class, and implement the interface with public properties `IButtonProps`.

```typescript
export class Button extends LitElement implements IButtonProps {}
```

Most likey, your IDE will not like that unrealized class properties are missing. Do not worry, we will do this below.

### LP: 3. Declare a map between contexts and insertion points

Widgets can work in different contexts. The contexts can have various insertion points. The compliance between them must be declared transparently.

```typescript
public static contextInsPoints = {
    SEARCH_RESULT: 'SEARCH_RESULT',
};
```

### LP: 4. Implement IButtonProps interface

Add the properties that will be available to the dapplets developer. Every property is marked with a decorator `@property`, this makes them reactive.

```typescript
@property() state; // required
@property() ctx; // required
@property() insPointName: string; // required
@property() img: string;
@property() label: string;
@property() loading: boolean;
@property() disabled: boolean;
@property() hidden: boolean;
@property() tooltip: string;
@property() isActive: boolean;
@property() exec: (ctx: any, me: IButtonProps) => void;
@property() init: (ctx: any, me: IButtonProps) => void;
```

Please be aware that there are several required properties that must be realized in your widget. They are system properties, which are defined by the Dynamic Adapter.

### LP: 5. Add init callback

All widgets are provided with an `init` hook so that dapplets developers can do something the moment a new context appears. This moment needs to be realized transparently.

```typescript
connectedCallback() {
    super.connectedCallback();
    this.init?.(this.ctx, this.state);
}
```

An overload of the `connectedCallback()` method in LitElement allows us to subscribe to the component rendering event. We will use this.

### LP: 6. Add a click handler function

A dapplets developer should have the possibility to subscribe to the button click event. Beforehand, we will add a click handler with a callback from the `exec` property.

```typescript
private _clickHandler(e) {
    this.exec?.(this.ctx, this.state);
    e.stopPropagation();
}
```

### LP: 7. Write the HTML code of the widget

Let's begin writing the HTML-template of the component.

The `render()` method is very similar to a method with the same name in a class-based approach to writing `React.js` components. Here you can also return `null` when it is not necessary to render the component. However, instead of JSX we use Tagged Template Literal - `html`.

```typescript
override render() {
    if (this.hidden) return null;

    return html`
        <div
            @click=${this._clickHandler}
            class="dapplet-widget-results"
            title="${this.tooltip}"
        >
            <img src="${this.img}" />
            <div>${this.label}</div>
        </div>
    `;
}
```

Learn more about all template possibilities in the official Lit documentation. There you can find information about using conditions in rendering, iterators, events, etc.

You can also look at an example of a complex widget from the [Twitter Adapter](https://github.com/dapplets/dapplet-modules/blob/a02906b001d3199ad5002e016f3dd18fbb65160a/packages/twitter-adapter-new/src/wb-button/index.ts).

### LP: 8. Style the widget by CSS

Declaration of CSS-styles is very similar to the approach used in the [`styled-components`](https://styled-components.com/) library, famous among React.js developers. Here the Tagged Template Literal - `css` function is used again.

```typescript
public static override styles = css`
    .dapplet-widget-results {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .dapplet-widget-results > img {
        width: 20px;
        margin-right: 1em;
        margin-bottom: 3px;
    }
    .dapplet-widget-results > div {
        display: inline-block;
        font-size: 1.1em;
        color: #f5504a;
        font-weight: bold;
    }

    .dapplet-widget-results:hover {
        text-decoration: underline;
        text-decoration-color: #f5504a;
    }
    :host {
        border: 1px solid rgb(170, 170, 170);
        display: table;
        padding: 2px 10px;
        border-radius: 4px;
    }
`;
```

Remeber that your Web Components are rendered inside Shadow DOM, which provides an isolation of the styles. This means that global styles of the parent web-page will not be able to redefine internal styles of your component and you will not be able to use them again.

Inside Shadow DOM you can style the shadow root element with the use of a CSS pseudo-class `:host()`. Sometimes this is useful for seamless website integration.

Pseudo-classes like `:hover` are also available here. You can use all of CSS power to style your components.

## Final Result

Together we have realized a button, that will be inserted into search results on the Google search page.

![](https://docs.dapplets.org/assets/images/ex16-search-result-button-9f4c8301a6fe069c45d66d3330b4dac2.gif)

The final solution is available in this branch: [`ex16-web-components-solution`](https://github.com/dapplets/dapplet-template/tree/ex16-web-components-solution).

The final initial code of the button is available [here](https://github.com/dapplets/dapplet-template/blob/ex16-web-components-solution/adapter/src/button.ts).

![](https://github.com/dapplets/dapplet-docs/blob/master/static/video/ex_16.gif)
