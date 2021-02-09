import { } from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/icon19.png';
import ICON_LOADING from './icons/loading.svg';

@Injectable
export default class TwitterFeature {
    // LP: define variables `wallet`, `_currentAddress` and `_transferAmount`
    private wallet: any;
    private _currentAddress: string = null;
    private _transferAmount: string = '0x1BC16D674EC80000';
    // LP end
    constructor(
        @Inject('twitter-adapter.dapplet-base.eth')
        public adapter: any //ITwitterAdapter;
    ) {
        const { button } = this.adapter.exports;
        this.adapter.attachConfig({
            POST_SOUTH: [
                button({
                    initial: 'DEFAULT',
                    DEFAULT: {
                        label: 'Connect',
                        img: EXAMPLE_IMG,
                        // LP: 1. Open wallet
                        exec:  async (ctx, me) => {
                            me.state = 'PENDING';
                            this.wallet = this.wallet || await Core.wallet();
                            this.wallet.sendAndListen('eth_accounts', [], {
                                result: (op, { type, data }) => {
                                    this._currentAddress = data[0];
                                    me.state = 'CONNECTED';
                                }
                            });
                        },
                        // LP end
                    },
                    // LP: 2. Add states CONNECTED, PENDING, REGECTED, COMPLETED and UNAVAILABLE.
                    CONNECTED: {
                        label: `Send ${BigInt(this._transferAmount) / BigInt(1000000000000000000)} ETH`,
                        img: EXAMPLE_IMG,
                        exec: async (ctx, me) => {
                            // LP: 3. Send the necessary data to wallet and listen for the answer.
                            this.wallet.sendAndListen('eth_sendTransaction', [{
                                from: this._currentAddress,
                                to: this._currentAddress,
                                value: this._transferAmount,
                            }], {
                                // LP: 4. Show the state of the transaction
                                pending: () => me.state = 'PENDING',
                                rejected: () => me.state = 'REGECTED',
                                result: () => me.state = 'MINING',
                                mined: (op, { type, hash }) => (
                                    me.state = hash === 0 || hash === 0x0 ? 'UNAVAILABLE' : 'COMPLETED'
                                ),
                            });
                        },
                    },
                    PENDING: {
                        label:'Pending',
                        img: ICON_LOADING,
                    },
                    REGECTED: {
                        label:'Rejected',
                        img: EXAMPLE_IMG,
                        exec: (ctx, me) => me.state = 'CONNECTED',
                    },
                    MINING: {
                        label:'Mining',
                        img: ICON_LOADING,
                    },
                    COMPLETED: {
                        label: 'Completed',
                        img: EXAMPLE_IMG,
                        exec: (ctx, me) => me.state = 'CONNECTED',
                    },
                    UNAVAILABLE: {
                        label: 'Not available',
                        img: EXAMPLE_IMG,
                        exec: (ctx, me) => me.state = 'CONNECTED',
                    },
                    // LP end
                }),
            ],
        });
    }
}
