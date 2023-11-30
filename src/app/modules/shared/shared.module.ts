import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { ButtonComponent } from './components/button/button.component'
import { CardBoardComponent } from './components/card-board/card-board.component'

@NgModule({
  declarations: [ButtonComponent, CardBoardComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [ButtonComponent, CardBoardComponent]
})
export class SharedModule {}
