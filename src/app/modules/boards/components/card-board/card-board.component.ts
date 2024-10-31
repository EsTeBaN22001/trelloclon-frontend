import { Component, EventEmitter, Input, Output } from '@angular/core'
import { COLORS, Colors } from '@models/colors.model'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-card-board',
  templateUrl: './card-board.component.html'
})
export class CardBoardComponent {
  @Input() id!: string
  @Input() title: string = 'Board'
  @Input() color: Colors = 'gray'

  // FontAwesome Icons
  faXmark = faXmark

  mapColors = COLORS

  // EventEmitter for delete Board passing the boardId
  @Output() delete = new EventEmitter<string>()

  get colors() {
    const classes = this.mapColors[this.color]
    return classes ? classes : {}
  }

  // getLighterColor(baseColor: any): string {
  //   return Color(baseColor).lighten(0.2).hex() // Ajusta el valor para hacer el color más claro
  // }

  onDelete(event: Event) {
    event.preventDefault()
    event.stopPropagation()

    if (this.id !== null) {
      this.delete.emit(this.id)
    }
  }
}
