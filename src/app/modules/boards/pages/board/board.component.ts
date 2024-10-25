import { Component, OnDestroy } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Dialog } from '@angular/cdk/dialog'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component'
import { BoardsService } from '@services/boards.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Board } from '@models/board.model'
import { Card } from '@models/card.model'
import { CardService } from '@services/card.service'
import { List } from '@models/list.model'
import { ListService } from '@services/list.service'
import { BACKGROUNDS } from '@models/colors.model'

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
  board: Board | null = null

  // Variable de estado para añadir una nueva columna/lista
  showNewListForm: boolean = false

  // Formulario para crear una nueva card
  inputCard = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required]
  })

  // Formulario para crear una nueva List
  inputNewList = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required]
  })

  // FontAwesome icons
  faPlus = faPlus

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
        this.router.navigate(['/boards'])
      }
    })
  }

  ngOnDestroy(): void {
    this.boardsService.backgroundColor$.next('sky')
  }

  private getBoard(id: string) {
    this.boardsService.getBoard(id).subscribe(board => {
      this.board = board
    })
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
    }

    // Lógica de la posición de la card
    const newItemPosition = this.boardsService.getPosition(event.container.data, event.currentIndex)
    const card = event.container.data[event.currentIndex]
    const listId = event.container.id
    this.updateCard(card, newItemPosition, parseInt(listId))
  }

  openDialog(card: Card) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        card: card
      }
    })
    dialogRef.closed.subscribe(output => {
      
    })
  }

  addList() {
    const title = this.inputNewList.value

    if (this.board) {
      this.listService
        .create({
          title,
          boardId: this.board.id,
          position: this.boardsService.getPositionNewItem(this.board.lists)
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
          boardId: this.board.id,
          position: this.boardsService.getPositionNewItem(list.cards)
        })
        .subscribe(card => {
          list.cards.push(card)
          this.inputCard.setValue('')
          list.showNewCardForm = false
        })
    }
  }

  updateCard(card: Card, position: number, listId: number) {
    this.cardService.updateCard(card.id, { position, listId }).subscribe(cardUpdated => {})
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
}
