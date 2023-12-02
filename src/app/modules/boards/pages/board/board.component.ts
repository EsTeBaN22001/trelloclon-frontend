import { Component } from '@angular/core'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Dialog } from '@angular/cdk/dialog'
import { TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component'

import { ToDo, Column } from '@models/todo.model'
import { BoardsService } from '@services/boards.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Board } from '@models/board.model'
import { Card } from '@models/card.model'
import { CardService } from '@services/card.service'

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
export class BoardComponent {
  board: Board | null = null

  constructor(
    private dialog: Dialog,
    private boardsService: BoardsService,
    private router: Router,
    private route: ActivatedRoute,
    private cardService: CardService
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

  private getBoard(id: string) {
    this.boardsService.getBoard(id).subscribe(board => {
      this.board = board
      // console.log(board)
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

  addColumn() {
    // this.columns.push({
    //   title: 'New Column',
    //   todos: []
    // })
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
      console.log(output)
    })
  }

  updateCard(card: Card, position: number, listId: number) {
    this.cardService.updateCard(card.id, { position, listId }).subscribe(cardUpdated => {
      // console.log(cardUpdated)
    })
  }
}
