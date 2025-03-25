import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BoardsComponent } from './boards.component'
import { UsersService } from '@services/users.service'
import { BoardsService } from '@services/boards.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { CdkAccordionModule } from '@angular/cdk/accordion'

describe('BoardsComponent', () => {
  let component: BoardsComponent
  let fixture: ComponentFixture<BoardsComponent>
  let usersService: UsersService
  let boardsService: BoardsService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardsComponent],
      providers: [UsersService, BoardsService],
      imports: [HttpClientTestingModule, CdkAccordionModule]
    }).compileComponents()

    usersService = TestBed.inject(UsersService)
    boardsService = TestBed.inject(BoardsService)
    fixture = TestBed.createComponent(BoardsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
