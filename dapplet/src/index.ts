import {} from '@dapplets/dapplet-extension'
import { Api } from './api'
import { IBridge, IStorage } from './types'

@Injectable
export default class TwitterFeature {
  @Inject('twitter-config.dapplet-base.eth')
  public adapter: any

  private state = Core.state<IStorage>({
    userAccount: '',
  })

  private api = new Api({
    state: this.state,
  })

  private overlay = Core.overlay<IBridge>({ name: 'overlay', title: 'Exercise 17' })
    // LP: 1. Add method 'useState' to the overlay
    .useState(this.state)
    // LP end
    // LP: 2. Declare the API in the overlay
    .declare(this.api)
  // LP end

  async activate(): Promise<void> {
    // LP: 3. Use the API's function for initialization account
    await this.api.initializeCurrentAccount()
    // LP end
    // LP: 4. Open the overlay and update the data about the session by the home button click
    Core.onAction(() => {
      this.overlay.open()
      this.api.initializeCurrentAccount()
    })
    // LP end
  }
}
