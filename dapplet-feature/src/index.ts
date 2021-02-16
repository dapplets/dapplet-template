import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/ex08.png'

@Injectable
export default class GoogleFeature {
  // LP: 1. Insert the correct adapter name

  public adapter
  // LP end

  async activate(): Promise<void> {
    const { button, avatarBadge } = this.adapter.exports
    this.adapter.attachConfig({
      POST: (ctx) =>
        button({
          DEFAULT: {
            label: 'Hi',
            img: EXAMPLE_IMG,
            tooltip: 'Show alert',
            // LP: 2. Log the POST context information to the console and show an alert
            //        with the title of the search result item on the button click.

            // LP end
          },
        }),
      // LP: 3. Add an avatar badge to the profile icon and log
      //        the PROFILE context information to the console.

      // LP end
    })
  }
}
