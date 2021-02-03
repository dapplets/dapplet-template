import { } from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/ex15-19px.png';

// LP: 2.1 Implement IDappState interface

// LP end

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;

  async activate() {
    // LP: 1. Get the URL from the config. Use Core.storage
    
    // LP end
    // LP: 2.2 Create a connection with the server. Use Core.connect. Also create a common state
    
    // LP end

    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST: (ctx: any) => {
        // LP: 3. Pass observable value of server's state to common state
        
        // LP end
        return button({
          initial: 'DEFAULT',
          DEFAULT: {
            img: EXAMPLE_IMG,
            // LP: 4. Pass observable counter to the label and in `exec` increase its value
            
            // LP end
          },
        });
      },
    });
  }
}
