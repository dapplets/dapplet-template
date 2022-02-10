import { } from '@dapplets/dapplet-extension';
import NEAR_ICON from './icons/near.svg';
import ETHEREUM_ICON from './icons/ethereum.svg';
import ABI from './abi';

@Injectable
export default class TwitterFeature {

  @Inject('twitter-adapter.dapplet-base.eth')
  public adapter: any;

  private overlay = Core.overlay({ name: 'main', title: 'Example 14' });

  async activate() {
    // LP: 1. Log out of all existing sessions
    const sessions = await Core.sessions();
    sessions.forEach(x => x.logout());
    // LP end

    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST: () => [
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Ethereum',
            img: ETHEREUM_ICON,
            exec: this.ethereumButtonClickHandler
          },
        }),
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'NEAR',
            img: NEAR_ICON,
            exec: this.nearButtonClickHandler
          },
        })
      ]
    });
  }

  ethereumButtonClickHandler = async (tweet: any) => {
    // LP: 2. Open overlay if you want to show login popup in it
    this.overlay.send('');
    // LP end

    // LP: 3. Create new Ethereum session or reuse existing
    const prevSessions = await Core.sessions();
    const prevSession = prevSessions.find(x => x.authMethod === 'ethereum/goerli');
    const session = prevSession ?? await Core.login({ authMethods: ['ethereum/goerli'], target: this.overlay });
    // LP end

    // LP: 4. Ethereum wallet interaction
    const wallet = await session.wallet();
    const accountIds = await wallet.request({ method: 'eth_accounts', params: [] });
    console.log('Your Ethereum addresses', accountIds);
    // LP end

    // LP: 5. Ethereum contract interaction
    const contract = await session.contract('0x7702aE3E1E0a96A428052BF3E4CB94965F5C0d7F', ABI);
    const tweets = await contract.getTweets(accountIds[0]); // read
    console.log('Tweets from Ethereum contract', tweets);
    await contract.addTweet(JSON.stringify(tweet)); // write
    // LP end
  }

  nearButtonClickHandler = async (tweet: any) => {
    // LP: 6. Open overlay if you want to show login popup in it
    this.overlay.send('');
    // LP end
    
    // LP: 7. Create new NEAR session or reuse existing
    const prevSessions = await Core.sessions();
    const prevSession = prevSessions.find(x => x.authMethod === 'near/testnet');
    const session = prevSession ?? await Core.login({ authMethods: ['near/testnet'], target: this.overlay });
    // LP end

    // LP: 8. NEAR wallet interaction
    const wallet = await session.wallet();
    console.log('Your NEAR address', wallet.accountId);
    // LP end

    // LP: 9. NEAR contract interaction
    const contract = await session.contract('dev-1634890606019-41631155713650', {
      viewMethods: ['getTweets'],
      changeMethods: ['addTweet', 'removeTweet'],
    });

    const tweets = await contract.getTweets({ nearId: wallet.accountId }); // read
    console.log('Tweets from NEAR contract', tweets);
    await contract.addTweet({ tweet: JSON.stringify(tweet) }); // write
    // LP end
  }
}
