import { IBridge } from './types'

export class Api implements IBridge {
  private state: any

  constructor(config: { state: any }) {
    this.state = config.state
  }

  async initializeCurrentAccount(): Promise<void> {
    const prevSessions = await Core.sessions()
    const prevSession = prevSessions.find((x) => x.authMethod === 'ethereum/goerli')
    if (prevSession) {
      const wallet = await prevSession.wallet()
      const accountIds = await wallet.request({ method: 'eth_accounts', params: [] })
      this.state.global.userAccount.next(accountIds[0])
    } else {
      this.state.global.userAccount.next('')
    }
  }

  async login(): Promise<void> {
    try {
      const prevSessions = await Core.sessions()
      const prevSession = prevSessions.find((x) => x.authMethod === 'ethereum/goerli')
      let session = prevSession ?? (await Core.login({ authMethods: ['ethereum/goerli'] }))
      let wallet = await session.wallet()
      if (!wallet) {
        session = await Core.login({ authMethods: ['ethereum/goerli'] })
        wallet = await session.wallet()
      }
      const accountIds = await wallet.request({ method: 'eth_accounts', params: [] })
      this.state.global.userAccount.next(accountIds[0])
    } catch (err) {
      console.log('Login was denied', err)
    }
  }

  async logout(): Promise<void> {
    const sessions = await Core.sessions()
    sessions.forEach((x) => x.logout())
    this.state.global.userAccount.next('')
  }
}
