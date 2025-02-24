import { Component, Inject } from '@angular/core'
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog'
import {
  faClose,
  faCheckToSlot,
  faBars,
  faUser,
  faTag,
  faCheckSquare,
  faClock,
  faPenToSquare,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import { Card } from '@models/card.model'
import { FormControl, Validators } from '@angular/forms'
import { CardService } from '@services/card.service'
import { List } from '@models/list.model'

interface InputData {
  card: Card
  listTitle: List['title']
}

interface OutputData {
  rta: boolean
}

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html'
})
export class TodoDialogComponent {
  faClose = faClose
  faCheckToSlot = faCheckToSlot
  faBars = faBars
  faUser = faUser
  faTag = faTag
  faCheckSquare = faCheckSquare
  faClock = faClock
  faPenToSquare = faPenToSquare
  faPlus = faPlus

  card: Card
  listTitle: List['title']

  showDescriptionEditForm: boolean = false

  inputDescription = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required]
  })

  showTitleEditForm: boolean = false

  inputTitle = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required]
  })

  constructor(
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData,
    private cardService: CardService
  ) {
    this.card = data.card
    this.listTitle = data.listTitle
    this.inputDescription.setValue(this.card.description || '')
    this.inputTitle.setValue(this.card.title || '')
  }

  close() {
    this.dialogRef.close()
  }

  toggleEditDescriptionCardForm() {
    this.showDescriptionEditForm = !this.showDescriptionEditForm
  }

  toggleEditTitleCardForm() {
    this.showTitleEditForm = !this.showTitleEditForm
  }

  saveDescriptionCard(card: Card) {
    this.card.description = this.inputDescription.value

    this.toggleEditDescriptionCardForm()

    // Petición al servicio para guardar la descripción
    this.cardService.updateCard({ id: card.id, description: card.description }).subscribe(res => {
      console.log(res)
    })
  }

  saveTitleCard(card: Card) {
    this.card.title = this.inputTitle.value

    this.toggleEditTitleCardForm()

    // Petición al servicio para guardar el títutlo
    this.cardService.updateCard({ id: card.id, title: card.title }).subscribe(res => {
      console.log(res)
    })
  }
}
