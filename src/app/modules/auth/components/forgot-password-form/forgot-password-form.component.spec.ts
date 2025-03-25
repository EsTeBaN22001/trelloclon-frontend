import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ForgotPasswordFormComponent } from './forgot-password-form.component'
import { AuthService } from '@services/auth.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('ForgotPasswordFormComponent', () => {
  let component: ForgotPasswordFormComponent
  let fixture: ComponentFixture<ForgotPasswordFormComponent>
  let authService: AuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordFormComponent],
      providers: [AuthService],
      imports: [HttpClientTestingModule]
    }).compileComponents()

    authService = TestBed.inject(AuthService)

    fixture = TestBed.createComponent(ForgotPasswordFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
