import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecoveryFormComponent } from './recovery-form.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AuthService } from '@services/auth.service'

describe('RecoveryFormComponent', () => {
  let component: RecoveryFormComponent
  let fixture: ComponentFixture<RecoveryFormComponent>
  let authService: AuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecoveryFormComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    }).compileComponents()

    authService = TestBed.inject(AuthService)
    fixture = TestBed.createComponent(RecoveryFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
