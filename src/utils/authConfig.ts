import { logout } from 'src/core/services/logout'

type Permission =
  | 'home:ask'
  | 'role:qry'
  | 'role:add'
  | 'role:del'
  | 'role:up'
  | 'user:qry'
  | 'user:add'
  | 'user:up'
  | 'news:qry'
  | 'news:add'
  | 'news:del'
  | 'news:upd'
  | string

const auth = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',

  setAccessToken(accessToken: string): void {
    window.localStorage.setItem(this.ACCESS_TOKEN, accessToken)
  },

  removeAccessToken(): void {
    window.localStorage.removeItem(this.ACCESS_TOKEN)
  },

  getAccessToken(): string | null {
    return window.localStorage.getItem(this.ACCESS_TOKEN)
  },

  logOut(): void {
    logout()
    this.removeAccessToken()
    window.localStorage.clear()
    location.href = '/'
  },

  isAuthenticated(): boolean {
    const accessToken = this.getAccessToken()
    return typeof accessToken === 'string' && accessToken.length > 0
  },

  getPermissions(permissionName: Permission): boolean {
    const permissions: string[] = JSON.parse(window.localStorage.getItem('permissions') as string)

    return permissions.includes(permissionName)
  },
}

export default auth
