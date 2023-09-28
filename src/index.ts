import {} from '@dapplets/dapplet-extension'
import data from './data.json'
interface NftMetadata {
  image: string
  text: string
}

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-config.dapplet-base.eth') public adapter: any

  async activate(): Promise<void> {
    let nfts: NftMetadata[] = data

    const { avatarBadge, button } = this.adapter.exports
    this.adapter.attachConfig({
      POST: (ctx) =>
        nfts &&
        nfts.map((nft) =>
          avatarBadge({
            DEFAULT: {
              img: nft.image,
              basic: true,
              tooltip: ctx.authorFullname + "'s " + nft.text,
            },
          })
        ),
      PROFILE: (ctx) =>
        nfts &&
        nfts.map((nft) =>
          button({
            DEFAULT: {
              img: nft.image,
              tooltip: ctx.authorFullname + "'s " + nft.text,
            },
          })
        ),
    })
  }
}
