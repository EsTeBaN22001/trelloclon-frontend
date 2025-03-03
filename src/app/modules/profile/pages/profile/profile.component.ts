import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { changeUserinfoDto, User } from '@models/user.model'
import { AuthService } from '@services/auth.service'
import { TokenService } from '@services/token.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profile: User = { id: '', name: '', email: '', avatar: '' }

  profileForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]]
  })

  // Dto para enviar los datos a la api
  userDto: changeUserinfoDto = { email: '' }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe(user => {
      this.profile = user
      this.profileForm.controls.name.setValue(user.name)
      this.profileForm.controls.email.setValue(user.email)
    })
  }

  saveChanges() {
    if (
      (this.profileForm.valid && this.profileForm.get('name')?.value !== this.profile.name) ||
      this.profileForm.get('email')?.value !== this.profile.email
    ) {
      this.userDto.email = this.profile.email

      let formName = this.profileForm.get('name')?.value
      let formEmail = this.profileForm.get('email')?.value

      if (formName !== this.profile.name) {
        this.userDto.newName = formName
      }

      if (formEmail !== this.profile.email) {
        this.userDto.newEmail = formEmail
      }

      this.authService.changeUserinfo(this.userDto).subscribe({
        next: res => {
          if (res.newToken) {
            this.tokenService.removeToken()
            this.tokenService.saveToken(res.newToken)
          }
          Swal.fire({
            title: 'Correct!',
            text: 'The user info has been updated successfully!',
            icon: 'success'
          }).then(() => {
            if (this.userDto.newName && formName !== this.profile.name) {
              this.profile.name = this.userDto.newName
            }
          })
        }
      })
    }
  }
}
