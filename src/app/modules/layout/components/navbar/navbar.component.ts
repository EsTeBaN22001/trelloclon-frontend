import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { faBell, faInfoCircle, faClose, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { User } from '@models/user.model'
import { AuthService } from '@services/auth.service'
import { TokenService } from '@services/token.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  user: User | null = null

  faBell = faBell
  faInfoCircle = faInfoCircle
  faClose = faClose
  faAngleDown = faAngleDown

  isOpenOverlayAvatar: boolean = false
  isOpenOverlayBoards: boolean = false
  isOpenOverlayCreateBoard: boolean = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe(user => (this.user = user))
  }

  logout() {
    this.authService.logout()
    window.location.reload()
  }

  isValidToken() {
    console.log(this.tokenService.isValidToken())
  }

  // Recibiendo el output del app-board-form (component)
  closeOverlay(event: boolean) {
    this.isOpenOverlayCreateBoard = event
  }
}
