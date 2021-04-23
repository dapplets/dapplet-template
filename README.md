# Example 11: Widgets Iterator

It is possible to create multiple widgets at the same insertion point by iterating over the array. Data for iteration can be obtained asynchronously from external sources directly inside the `adapter.attachConfig()` function.

The complete code for this example can be found here: [ex11-widgets-iterator](https://github.com/dapplets/dapplet-template/tree/ex11-widgets-iterator).

The iteration is in the insertion point and looks like this:

```ts
// /dapplet/src/index.ts > TwitterFeature > activate > this.adapter.attachConfig
...
POST_USERNAME_LABEL: async (ctx) => {
  const res = await fetch(url);
  const data = res.json();
  return data.map((nft) =>
    label({
      DEFAULT: {
        img: data.image,
        basic: true,
        tooltip: data.text + ' of ' + ctx.authorFullname,
      },
    }),
  );
},
...
```

Here we return the array of labels or another widgets.

We also can returnthe only one widget or `null`:

```ts
...
return data && label({
  DEFAULT: {
    img: data[0].image,
    basic: true,
    tooltip: data[0].text + ' of ' + ctx.authorFullname,
  },
});
...
```

Here is the full code of `/dapplet/src/index.ts` of the example:

```ts
import {} from '@dapplets/dapplet-extension';

interface NftMetadata {
  image: string;
  text: string;
}

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;

  private async _fetchNfts(url: string): Promise<NftMetadata[]> {
    const res = await fetch(url);
    return res.json();
  }

  async activate() {
    const { label, button } = this.adapter.exports;
    const url = await Core.storage.get('dataUrl');
    this.adapter.attachConfig({
      POST_USERNAME_LABEL: async (ctx) => {
        const nfts = await this._fetchNfts(url);
        return nfts.map((nft) =>
          label({
            DEFAULT: {
              img: nft.image,
              basic: true,
              tooltip: nft.text + ' of ' + ctx.authorFullname,
            },
          }),
        );
      },
      PROFILE_BUTTON_GROUP: async (ctx) => {
        const nfts = await this._fetchNfts(url);
        return nfts.map((nft) =>
          button({
            DEFAULT: {
              img: nft.image,
              tooltip: nft.text + ' of ' + ctx.authorFullname,
            },
          }),
        );
      },
    });
  }
}

```

Run the dapplet:

```bash
npm i
npm start
```

This page in the docs is [here.](https://docs.dapplets.org/docs/widgets-iterator)
