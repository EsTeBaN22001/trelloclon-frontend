import { Component, OnDestroy } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Dialog } from '@angular/cdk/dialog'
import { faPlus, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component'
import { BoardsService } from '@services/boards.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Board } from '@models/board.model'
import { Card } from '@models/card.model'
import { CardService } from '@services/card.service'
import { List } from '@models/list.model'
import { ListService } from '@services/list.service'
import { BACKGROUNDS } from '@models/colors.model'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `
  ]
})
export class BoardComponent implements OnDestroy {
  board!: Board | null

  // Variables de estado para mostrar formulario de edición o creación
  showNewListForm: boolean = false
  showEditTitleListForm: boolean = false
  showEditTitleBoardForm: boolean = false

  // Forms para crear o editar
  inputCard = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required]
  })
  inputNewList = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required]
  })
  inputEditTitleList = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required]
  })
  inputEditTitleBoard = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required]
  })

  // FontAwesome icons
  faPlus = faPlus
  faXmark = faXmark
  faPenToSquare = faPenToSquare

  backgroundColor = BACKGROUNDS

  constructor(
    private dialog: Dialog,
    private boardsService: BoardsService,
    private router: Router,
    private route: ActivatedRoute,
    private cardService: CardService,
    private listService: ListService
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')

      if (id) {
        this.getBoard(id)
      } else {
        this.router.navigate(['/'])
      }
    })
  }

  ngOnDestroy(): void {
    this.boardsService.backgroundColor$.next('sky')
  }

  private getBoard(id: string) {
    this.boardsService.getBoard(id).subscribe({
      next: board => {
        if (!board.hasOwnProperty('lists')) {
          board.lists = []
        }

        this.board = board
      },
      error: () => {
        this.router.navigate(['/'])
      }
    })
  }

  dropCard(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
    }

    // Lógica de la posición de la card
    const newItemPosition = this.boardsService.getPosition(event.container.data, event.currentIndex)
    const card = event.container.data[event.currentIndex]
    const listId = parseInt(event.container.id)
    this.cardService.updateCard({ id: card.id, position: newItemPosition, listId }).subscribe(res => {
      // Actualizar el listId en la card
      event.container.data[event.currentIndex].listId = `${listId}`
    })
  }

  dropList(event: CdkDragDrop<List[]>) {
    moveItemInArray(this.board?.lists ?? [], event.previousIndex, event.currentIndex)

    const currentList = this.board?.lists.find(list => {
      return list.id == event.item.element.nativeElement.id
    })

    const newItemPosition = this.boardsService.getPosition(this.board?.lists ?? [], event.currentIndex)

    this.board?.lists.forEach(list => {
      if (list.id == event.item.element.nativeElement.id) {
        list.position = newItemPosition
      }
    })
    // Hacer petición al servicio y actualizar la posición
    this.listService.update({ id: currentList?.id, position: newItemPosition }).subscribe()
  }

  openDialog(card: Card, listTitle: string) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '30%',
      maxWidth: '50%',
      data: {
        card: card,
        listTitle: listTitle
      }
    })
    dialogRef.closed.subscribe()
  }

  addList() {
    const title = this.inputNewList.value

    if (this.board) {
      this.listService
        .create({
          title,
          boardId: this.board.id,
          position: this.boardsService.getPositionNewCard(this.board.lists)
        })
        .subscribe(list => {
          this.board?.lists.push({
            ...list,
            cards: []
          })
          this.showNewListForm = false
          this.inputNewList.setValue('')
        })
    }
  }

  openFormNewCard(list: List) {
    if (this.board?.lists) {
      this.board.lists = this.board.lists.map(iteratorList => {
        if (iteratorList.id === list.id) {
          return {
            ...iteratorList,
            showNewCardForm: true
          }
        }
        return {
          ...iteratorList,
          showNewCardForm: false
        }
      })
    }
  }

  closeFormNewCard(list: List) {
    list.showNewCardForm = false
  }

  createCard(list: List) {
    const title = this.inputCard.value

    if (this.board) {
      this.cardService
        .create({
          title,
          listId: list.id,
          position: this.boardsService.getPositionNewCard(list.cards)
        })
        .subscribe(card => {
          list.cards.push(card)
          this.inputCard.setValue('')
          list.showNewCardForm = false
        })
    }
  }

  get colors() {
    if (this.board) {
      const classes = this.backgroundColor[this.board.backgroundColor]
      if (classes) {
        return classes ? classes : {}
      }
    }
    return {}
  }

  deleteList(listId: List['id']) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be reversed!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then(result => {
      if (result.isConfirmed) {
        this.listService.delete(listId).subscribe({
          next: () => {
            Swal.fire({
              title: 'Correct',
              text: 'Column was successfully deleted',
              icon: 'success',
              confirmButtonColor: '#3085d6'
            }).then(() => {
              // @ts-ignore
              this.board.lists = this.board?.lists.filter((list: List) => list.id !== listId)
            })
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'There was an error deleting the column'
            })
          }
        })
      }
    })
  }

  deleteCard(event: Event, cardId: Card['id'], listId: List['id']) {
    event.stopPropagation()
    event.preventDefault()

    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be reversed!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then(result => {
      if (result.isConfirmed) {
        this.cardService.delete(cardId).subscribe({
          next: () => {
            Swal.fire({
              title: 'Correct',
              text: 'The card was deleted successfully',
              icon: 'success',
              confirmButtonColor: '#3085d6'
            }).then(() => {
              this.board?.lists.map((list: List) => {
                if (list.id === listId) {
                  list.cards = list.cards.filter((card: Card) => card.id !== cardId)
                }
              })
            })
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'There was an error deleting the card'
            })
          }
        })
      }
    })
  }

  // Abrir el formulario para editar el nombre de una lista según su id
  openEditTitleList(list: List) {
    if (this.board?.lists) {
      this.board.lists = this.board.lists.map(iteratorList => {
        if (iteratorList.id === list.id) {
          this.inputEditTitleList.setValue(iteratorList.title)
          return {
            ...iteratorList,
            showEditTitleForm: true
          }
        }
        return {
          ...iteratorList,
          showEditTitleForm: false
        }
      })
    }
  }

  // Actualizar el valor del título de la lista desde su servicio
  updateTitleList(list: List) {
    // Mostrar en el título de la lista el nuevo valor y ocultar el EditForm
    this.board?.lists.map(iteratorList => {
      if (iteratorList.id == list.id) {
        if (list.title !== this.inputEditTitleList.value) {
          iteratorList.title = this.inputEditTitleList.value
          iteratorList.showEditTitleForm = false
          this.listService.update({ id: list.id, title: list.title }).subscribe()
        }
      }
    })
  }

  openEditTitleBoard(board: Board) {
    this.showEditTitleBoardForm = true
    this.inputEditTitleBoard.setValue(board.title)
  }

  updateTitleBoard(board: Board) {
    if (board.title === this.inputEditTitleBoard.value) return

    board.title = this.inputEditTitleBoard.value
    this.boardsService.updateBoard({ id: board.id, title: board.title }).subscribe()
    this.showEditTitleBoardForm = false
  }
}
