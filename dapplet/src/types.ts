export interface IStorage {
  userAccount: string
}

export interface IBridge {
  login: () => Promise<void>
  logout: () => Promise<void>
}
