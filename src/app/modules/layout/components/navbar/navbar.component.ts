import { Component, OnInit } from '@angular/core'
import { faBell, faInfoCircle, faClose, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { Board } from '@models/board.model'
import { Colors } from '@models/colors.model'
import { User } from '@models/user.model'
import { AuthService } from '@services/auth.service'
import { BoardsService } from '@services/boards.service'
import { UsersService } from '@services/users.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  user: User | null = null

  boards: Board[] = []

  bgColor: Colors = 'sky'

  faBell = faBell
  faInfoCircle = faInfoCircle
  faClose = faClose
  faAngleDown = faAngleDown

  isOpenOverlayAvatar: boolean = false
  isOpenOverlayBoards: boolean = false
  isOpenOverlayCreateBoard: boolean = false

  constructor(
    private authService: AuthService,
    private boardService: BoardsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe(user => (this.user = user))
    this.boardService.backgroundColor$.subscribe(color => {
      this.bgColor = color
    })

    this.usersService.getBoards().subscribe(boards => {
      this.boards = boards
    })
  }

  logout() {
    this.authService.logout()
    window.location.reload()
  }

  // Recibiendo el output del app-board-form (component)
  closeOverlay(event: boolean) {
    this.isOpenOverlayCreateBoard = event
  }
}
