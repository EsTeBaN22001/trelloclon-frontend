import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BoardFormComponent } from './board-form.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('BoardFormComponent', () => {
  let component: BoardFormComponent
  let fixture: ComponentFixture<BoardFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardFormComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents()

    fixture = TestBed.createComponent(BoardFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
