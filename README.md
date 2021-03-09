# 10. Dapplets. Exercise #10: New Virtual adapter (interface)

- The point of a virtual adapter is to run one dapplet on many adapters.
  In this exercise you should implement a virtual adapter for two search adapters.
  The start point of the exercise is solution for the example 08: adapter development. There is an adapter for Google and dapplet for it.
- Steps:
  1. Add search adapter for Yahoo.
  2. Add `./my-virtual-adapter/` folder that should have a structure similar to Google adapter.
  3. The `./my-virtual-adapter/src/` folder should contain only `index.ts` that exports an empty object.
  4. In the `./my-virtual-adapter/dapplet.json` set `"type": "INTERFACE"` and remove `"contextIds"` and `"dependencies"`.
  5. Add virtual adapter to `"interfaces: []"` in `dapplet.json` of Google and Yahoo adapters and to `"contextIds"` and `"dependencies"` of the dapplet.
  6. Change injecting of Google adapter to Virtual adapter in `./dapplet-feature/src/index.ts`.
