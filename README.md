# Dapplet Template
## Getting Started
1. Fork and clone the repository.

2. Change module name from "dapplet-template.dapplet-base.eth" to yours in `package.json` file.

3. Fill in fields in the manifests `package.json` and `dapplet.json`.

4. Change icons to yours in `src/icons` folder. 

The icon `src/icon19.png` is used for the injected button in source code `src/index.ts`.

The icon `src/icon64.png` is used for display in the store of Dapplets. The link to this icon is defined in `dapplet.json` manifest.

5. Add necessary settings to the `config/schema.json` file. 

The default values of settings are defined in `config/default.json` file. 

There are three environments: 
* `dev` - used when a module is loaded from development server;
* `test` - used when a module is loaded from Test Dapplet Registry;
* `prod` - used when a module is loaded from Production Dapplet Registry;

6. You can use another Adapter in your Dapplet. 

Dependencies are defined in the `dependencies` section of the `dapplet.json` file. 

The Twitter adapter is used by default. 

The list of our adapters are available now:
* [`twitter-adapter.dapplet-base.eth`](https://github.com/dapplets/dapplet-modules/tree/master/packages/twitter-adapter) - site-specific adapter for [Twitter](twitter.com);
* [`instagram-adapter.dapplet-base.eth`](https://github.com/dapplets/dapplet-modules/tree/master/packages/instagram-adapter) - site-specific adapter for [Instagram](instagram.com);
* [`identity-adapter.dapplet-base.eth`](https://github.com/dapplets/dapplet-modules/tree/master/packages/identity-adapter) - virtual adapter (interface), which is an abstract of two adapters above;
* [`common-adapter.dapplet-base.eth`](https://github.com/dapplets/dapplet-modules/tree/master/packages/common-adapter) - viewport adapter is universal adapter which contains generic insertion points and is compatible with any web-sites.

7. Fill in `contextIds` section of the `dapplet.json` file. 

`ContextId` is the identifier of a context to which your module is bound. This is usually the same as the name of an adapter you are using. It may be:
* the name of an adapter you depend on (e.g. `twitter-adapter.dapplet-base.eth`);
* the domain name of a website to which you are creting a dapplet (e.g. `twitter.com`);
* the identifier of a dynamic context (e.g. `twitter.com/1346093004537425927`).
