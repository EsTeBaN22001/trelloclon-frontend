import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Colors } from '@models/colors.model'
import { BoardsService } from '@services/boards.service'

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html'
})
export class BoardFormComponent implements OnInit {
  @Output() closeOverlay = new EventEmitter<boolean>()

  // FontAwesome Icons
  faCheck = faCheck

  // BackgroundColor variable
  backgroundColor: Colors = 'sky'

  form = this.formBuilder.group({
    title: ['', [Validators.required]],
    backgroundColor: new FormControl<Colors>('sky', {
      nonNullable: true,
      validators: [Validators.required]
    })
  })

  constructor(
    private formBuilder: FormBuilder,
    private boardsService: BoardsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form.get('backgroundColor')?.valueChanges.subscribe(color => {
      this.backgroundColor = color as Colors
    })
  }

  onSave() {
    if (this.form.valid) {
      const { title, backgroundColor } = this.form.getRawValue()
      this.boardsService.createBoard(title ?? '', backgroundColor).subscribe(board => {
        this.closeOverlay.next(false)
        this.router.navigate([`/app/boards/${board.id}`])
      })
    } else {
      this.form.markAllAsTouched()
    }
  }
}
