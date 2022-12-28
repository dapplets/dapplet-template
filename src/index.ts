import {} from '@dapplets/dapplet-extension'
import BN from 'bn.js'
import EXAMPLE_IMG from './icons/ex05.png'

const { parseNearAmount } = Core.near.utils.format

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any

  async activate() {
    // LP: 1. Get the **wallet** object and common variables: `transferAmountEth`, `transferAmountNear` and `currentEthAddresses`
    const wallet = await Core.wallet({ authMethods: ['ethereum/goerli', 'near/testnet'] })
    const transferAmountEth: number = await Core.storage.get('transferAmountEth')
    const transferAmountNear: number = await Core.storage.get('transferAmountNear')
    let currentEthAddresses: string[]
    // LP end

    const { button } = this.adapter.exports
    this.adapter.attachConfig({
      POST: () => {
        return button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Connect',
            img: EXAMPLE_IMG,
            // LP: 3. Connect the wallet
            exec: async (_, me) => {
              me.state = 'PENDING'
              try {
                await wallet.connect()
              } catch (err) {
                console.log('Login ERROR:', err)
                me.state = 'REJECTED'
                return
              }
              me.state =
                wallet.authMethod === 'ethereum/goerli' ? 'ETH_CONNECTED' : 'NEAR_CONNECTED'
            },
            // LP end
          },
          // LP: 2. Add states ETH_CONNECTED, NEAR_CONNECTED, COMPLETED, FAILURE, REJECTED, PENDING and MINING
          ETH_CONNECTED: {
            label: `Send ${transferAmountEth} ETH`,
            img: EXAMPLE_IMG,
            loading: false,
            // LP: 4. Send the necessary data to Ethereum wallet and listen to the response
            exec: async (_, me) => {
              if (wallet.authMethod === 'ethereum/goerli') {
                me.state = 'PENDING'
                if (!currentEthAddresses) {
                  try {
                    currentEthAddresses = await wallet.request({
                      method: 'eth_accounts',
                      params: [],
                    })
                  } catch (err) {
                    console.log('Get ETH accounts ERROR:', err)
                    me.state = 'REJECTED'
                    return
                  }
                }
                try {
                  const transferAmount =
                    BigInt(transferAmountEth * 1_000_000) * BigInt(1_000_000_000_000)
                  const transactionHash = await wallet.request({
                    method: 'eth_sendTransaction',
                    params: [
                      {
                        from: currentEthAddresses[0],
                        to: currentEthAddresses[0],
                        value: transferAmount.toString(16),
                      },
                    ],
                  })
                  console.log('transactionHash', transactionHash)
                  me.state = 'MINING'
                  try {
                    const transactionReceipt = await wallet.waitTransaction(transactionHash, 2)
                    console.log('transactionReceipt', transactionReceipt)
                    await wallet.disconnect()
                    me.state = transactionReceipt.status === '0x1' ? 'COMPLETED' : 'FAILURE'
                  } catch (err) {
                    console.log('Transaction waiting ERROR:', err)
                    me.state = 'FAILURE'
                  }
                } catch (err) {
                  console.log('Transaction ERROR:', err)
                  me.state = 'REJECTED'
                }
              } else if (wallet.authMethod === 'near/testnet') {
                me.state = 'NEAR_CONNECTED'
              } else {
                me.state = 'DEFAULT'
              }
            },
            // LP end
          },
          NEAR_CONNECTED: {
            label: `Send ${transferAmountNear} NEAR`,
            img: EXAMPLE_IMG,
            loading: false,
            // LP: 5. Send the necessary data to NEAR wallet and listen to the response
            exec: async (_, me) => {
              if (wallet.authMethod === 'near/testnet') {
                me.state = 'PENDING'
                try {
                  const amount = new BN(parseNearAmount(transferAmountNear.toString()))
                  const finalExecutionOutcome = await wallet.sendMoney(wallet.accountId, amount)
                  console.log('finalExecutionOutcome', finalExecutionOutcome)
                  await wallet.disconnect()
                  const status = Object.keys(finalExecutionOutcome.status)[0]
                  me.state =
                    status === 'SuccessValue' || status === 'SuccessReceiptId'
                      ? 'COMPLETED'
                      : 'FAILURE'
                } catch (err) {
                  console.log('Transaction ERROR:', err)
                  me.state = 'REJECTED'
                }
              } else if (wallet.authMethod === 'ethereum/goerli') {
                me.state = 'ETH_CONNECTED'
              } else {
                me.state = 'DEFAULT'
              }
            },
            // LP end
          },
          COMPLETED: {
            label: 'Completed',
            img: EXAMPLE_IMG,
            loading: false,
            exec: (_, me) => {
              me.state =
                wallet.authMethod === 'ethereum/goerli' ? 'ETH_CONNECTED' : 'NEAR_CONNECTED'
            },
          },
          FAILURE: {
            label: 'Failure',
            img: EXAMPLE_IMG,
            loading: false,
            exec: (_, me) => {
              me.state =
                wallet.authMethod === 'ethereum/goerli' ? 'ETH_CONNECTED' : 'NEAR_CONNECTED'
            },
          },
          REJECTED: {
            label: 'Rejected',
            img: EXAMPLE_IMG,
            loading: false,
            exec: async (_, me) => {
              me.state = (await wallet.isConnected())
                ? wallet.authMethod === 'ethereum/goerli'
                  ? 'ETH_CONNECTED'
                  : 'NEAR_CONNECTED'
                : 'DEFAULT'
            },
          },
          PENDING: {
            label: 'Pending',
            loading: true,
            exec: null,
          },
          MINING: {
            label: 'Mining',
            loading: true,
            exec: null,
          },
          // LP end
        })
      },
    })
  }
}
