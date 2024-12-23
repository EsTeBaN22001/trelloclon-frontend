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

interface InputData {
  card: Card
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

  showDescriptionEditForm: boolean = false

  inputDescription = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required]
  })

  constructor(
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData,
    private cardService: CardService
  ) {
    this.card = data.card
    this.inputDescription.setValue(this.card.description || '')
  }

  close() {
    this.dialogRef.close()
  }

  openEditDesciptionCardForm() {
    this.showDescriptionEditForm = true
  }

  closeEditDesciptionCardForm() {
    this.showDescriptionEditForm = false
  }

  saveDescriptionCard(card: Card) {
    const newDescription = this.inputDescription.value

    this.card.description = newDescription

    this.closeEditDesciptionCardForm()

    // Petición al servicio para guardar la descripción
    this.cardService.updateCard({ id: card.id, description: card.description }).subscribe(res => {
      console.log(res)
    })
  }
}
