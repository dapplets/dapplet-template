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
