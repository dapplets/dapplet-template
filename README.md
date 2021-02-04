# Example 04: Overlays
* [Pure HTML page](https://github.com/dapplets/dapplet-overlay-bridge/tree/master/examples/pure-html-page)
* [React.js based example](https://github.com/dapplets/dapplet-overlay-bridge/tree/master/examples/react-overlay)
1. Install [Dapplet-Overlay Bridge](https://github.com/dapplets/dapplet-overlay-bridge).
2. Realize overlays (run as separate apps):
    * Add button to overlay, that send new name for dapplet button. For example, toggle "tick-tock";
    * Add counter in dapplet, that count amount of clicks on overlay button.
3. Communication between the dapplet and the overlay:
    * send data to the overlay;
    * send data to the dapplet.

    There are two methods in the class Bridge:
    1. this.subscribe(type, fn) - to get data;
    2. this.publish(this._subId.toString(), { type, message }) - to send data.

	They are using inside of class methods.
    type = method's name.
    
    * Don't forget to add "overlayUrl" to config.
    * For running dapplet with overlay choose one of npm scripts: npm run start-html | npm run start-react
4. Publish React overlay to a decentralized storage (Swarm)
- in overlay's package.json add `"homepage": "./"` and scripts `"archive"`, `"swarm:upload"`, `"deploy"`:

        "homepage": "./",
        "scripts": {
            "archive": "cd ./build && tar -cvf temp.tar .",
            "swarm:upload": "curl -X POST -H \"Content-Type: application/x-tar\" -H \"Swarm-Index-Document: index.html\" -H \"Swarm-Error-Document: index.html\" --data-binary @build/temp.tar https://gateway.ethswarm.org/dirs",
            "deploy": "npm run build && npm run archive && npm run swarm:upload"
        }
        
- from overlay's directory run deploy: `npm run deploy`;
- copy hash from console:  `{"reference":"7cf\*\*\*dac17e"}`;
- add to url `https://gateway.ethswarm.org/bzz/` (expects something like this: `https://gateway.ethswarm.org/bzz/7cf\*\*\*dac17e/`);
- the url add to config to default.json and add appropriate field to schema.json;
- get the url in the dapplet asynchronously: `Core.storage.get('field_of_your_url')`.
