import { Component, Input } from '@angular/core'
import { COLORS, Colors } from '@models/colors.model'

@Component({
  selector: 'app-card-board',
  templateUrl: './card-board.component.html'
})
export class CardBoardComponent {
  @Input() id: number | null = null
  @Input() title: string = 'Board'
  @Input() color: Colors = 'gray'

  mapColors = COLORS

  get colors() {
    // console.log(this.mapColors[this.color])
    const classes = this.mapColors[this.color]
    return classes ? classes : {}
  }
}
