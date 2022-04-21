import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/dapplet-icon.png';

interface NftMetadata {
  image: string;
  text: string;
}

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;

  async activate() {
    const url = await Core.storage.get('dataUrl');
    let nfts: NftMetadata[];
    try {
      nfts = await this._fetchNfts(url);
    } catch (err) {
      console.log('Error getting NFTs.', err);
    }

    const { label, button } = this.adapter.exports;
    
    this.adapter.attachConfig({
      POST: (ctx) =>
        nfts &&
        nfts.map((nft) =>
          label({
            DEFAULT: {
              img: nft.image,
              basic: true,
              tooltip: ctx.authorFullname + "'s " + nft.text,
            },
          }),
        ),
      PROFILE: (ctx) =>
        nfts &&
        nfts.map((nft) =>
          button({
            DEFAULT: {
              img: nft.image,
              tooltip: ctx.authorFullname + "'s " + nft.text,
            },
          }),
        ),
    });
  }

  private async _fetchNfts(url: string): Promise<NftMetadata[]> {
    let res: any;
    try {
      res = await fetch(url);
    } catch (err) {
      console.log('Error fetching NFTs.', err);
    }
    return res.json();
  }
}
