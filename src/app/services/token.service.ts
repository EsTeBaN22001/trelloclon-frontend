import { Injectable } from '@angular/core'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'
// import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() {}

  saveToken(token: string) {
    setCookie('token', token, { expires: 365, path: '/' })
    // this.cookieService.set('token', token)
  }

  getToken() {
    const token = getCookie('token')
    // const token = this.cookieService.get('token')
    return token
  }

  removeToken() {
    removeCookie('token')
    // this.cookieService.delete('token')
  }

  isValidToken(): boolean {
    const token = this.getToken()
    if (!token) {
      return false
    }

    const decodeToken = jwtDecode<JwtPayload>(token)

    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0)
      tokenDate.setUTCSeconds(decodeToken.exp)
      const today = new Date()

      return tokenDate.getTime() > today.getTime()
    }

    return false
  }
}
