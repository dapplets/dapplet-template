# Example 11: Widgets Iterator

The function that we pass to augment the context can return either a **single widget**, or an **array of widgets**, or a **null**. The widgets in the array can be of the same or different types. The function itself can be either **synchronous** or **asynchronous**.

The initial code for this example is in [master.](https://github.com/dapplets/dapplet-template/tree/master)

Let's create a few `label`-s for `POST` and `button`-s for `PROFILE`. We will use `data.json` as data. We will fetch _nfts_, which contain an _image_ and _text_, in an asynchronous `activate` function.

```ts
// /dapplet/src/index.ts > TwitterFeature
async activate() {
  const url = await Core.storage.get('dataUrl');
  let nfts: NftMetadata[];
  try {
    nfts = await this._fetchNfts(url);
  } catch (err) {
    console.log('Error getting NFTs.', err)
  }

  const { label, button } = this.adapter.exports;
  this.adapter.attachConfig({
    POST: (ctx) =>
      nfts && nfts.map((nft) =>
        label({
          DEFAULT: {
            img: nft.image,
            basic: true,
            tooltip: ctx.authorFullname + "'s " + nft.text,
          },
        }),
      ),
    PROFILE: (ctx) =>
      nfts && nfts.map((nft) =>
        button({
          DEFAULT: {
            img: nft.image,
            tooltip: ctx.authorFullname + "'s " + nft.text,
          },
        }),
      ),
  });
}
```

Also add `_fetchNfts` function:

```ts
private async _fetchNfts(url: string): Promise<NftMetadata[]> {
  let res: any;
  try {
    res = await fetch(url);
  } catch (err) {
    console.log('Error fetching NFTs.', err)
  }
  return res.json();
}
```

Run the dapplet:

```bash
npm i
npm start
```

![](https://github.com/dapplets/dapplet-docs/blob/master/static/video/ex_11.gif)

This page in the docs is [here.](https://docs.dapplets.org/docs/widgets-iterator)
