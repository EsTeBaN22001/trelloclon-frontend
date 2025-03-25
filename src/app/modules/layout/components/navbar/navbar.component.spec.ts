import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NavbarComponent } from './navbar.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { OverlayModule } from '@angular/cdk/overlay'

describe('NavbarComponent', () => {
  let component: NavbarComponent
  let fixture: ComponentFixture<NavbarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [HttpClientTestingModule, OverlayModule]
    }).compileComponents()

    fixture = TestBed.createComponent(NavbarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
