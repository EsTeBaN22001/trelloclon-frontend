import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TodoDialogComponent } from './todo-dialog.component'
import { CardService } from '@services/card.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { DialogModule, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog'
import { CdkAccordionModule } from '@angular/cdk/accordion'

describe('TodoDialogComponent', () => {
  let component: TodoDialogComponent
  let fixture: ComponentFixture<TodoDialogComponent>
  let cardService: CardService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoDialogComponent],
      providers: [
        CardService,
        // Aquí agregamos los providers necesarios
        { provide: DialogRef, useValue: {} },
        { provide: DIALOG_DATA, useValue: {} }
      ],
      imports: [HttpClientTestingModule, DialogModule, CdkAccordionModule]
    }).compileComponents()

    cardService = TestBed.inject(CardService)
    fixture = TestBed.createComponent(TodoDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
