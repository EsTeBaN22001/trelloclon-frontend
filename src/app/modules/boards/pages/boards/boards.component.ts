import { Component, OnInit } from '@angular/core'
import {
  faBox,
  faWaveSquare,
  faClock,
  faAngleUp,
  faAngleDown,
  faHeart,
  faBorderAll,
  faUsers,
  faGear
} from '@fortawesome/free-solid-svg-icons'
import { faTrello } from '@fortawesome/free-brands-svg-icons'
import { Board } from '@models/board.model'
import { UsersService } from '@services/users.service'
import { BoardsService } from '@services/boards.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html'
})
export class BoardsComponent implements OnInit {
  faTrello = faTrello
  faBox = faBox
  faWaveSquare = faWaveSquare
  faClock = faClock
  faAngleUp = faAngleUp
  faAngleDown = faAngleDown
  faHeart = faHeart
  faBorderAll = faBorderAll
  faUsers = faUsers
  faGear = faGear

  boards: Board[] = []

  constructor(
    private userService: UsersService,
    private boardService: BoardsService
  ) {}

  ngOnInit(): void {
    this.userService.getBoards().subscribe(boards => {
      this.boards = boards
    })
  }

  confirmDelete(boardId: string) {
    Swal.fire({
      title: 'Estas seguro/a?',
      text: 'Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then(result => {
      if (result.isConfirmed) {
        this.boardService.deleteBoard(boardId).subscribe({
          next: () => {
            Swal.fire({
              title: 'Correcto',
              text: 'Se borró correctamente el tablero',
              icon: 'success',
              confirmButtonColor: '#3085d6'
            }).then(() => {
              this.boards = this.boards.filter(board => board.id !== boardId)
            })
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hubo un error al borrar el tablero'
            })
          }
        })
      }
    })
  }
}
