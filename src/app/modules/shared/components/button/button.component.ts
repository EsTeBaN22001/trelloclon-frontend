import { Component, Input, OnInit } from '@angular/core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { COLORS, Colors } from '@models/colors.model'

@Component({
  selector: 'app-btn',
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() disabled = false
  @Input() loading = false
  @Input() typeBtn: 'reset' | 'submit' | 'button' = 'button'
  @Input() color: Colors = 'primary'
  @Input() width: string = 'w-full'
  faSpinner = faSpinner

  mapColors = COLORS

  constructor() {}

  get colors() {
    const colors = this.mapColors[this.color]
    if (colors) {
      // Le agrega el input width si es que existe
      colors[this.width] = true
      return colors
    }
    return {}
  }
}
