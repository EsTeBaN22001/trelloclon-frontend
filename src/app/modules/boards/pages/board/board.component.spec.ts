import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BoardComponent } from './board.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { DialogModule } from '@angular/cdk/dialog'
import { RouterTestingModule } from '@angular/router/testing'

describe('BoardComponent', () => {
  let component: BoardComponent
  let fixture: ComponentFixture<BoardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, DialogModule]
    }).compileComponents()

    fixture = TestBed.createComponent(BoardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
