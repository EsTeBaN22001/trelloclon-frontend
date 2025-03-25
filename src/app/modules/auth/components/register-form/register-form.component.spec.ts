import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RegisterFormComponent } from './register-form.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent
  let fixture: ComponentFixture<RegisterFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents()

    fixture = TestBed.createComponent(RegisterFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
