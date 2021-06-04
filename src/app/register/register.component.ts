import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { confirmValidator } from '../validators/confirm.validator';
import Swal from 'sweetalert2';
import { UserService } from '../services/usuario/user.service';
import { User } from '../classes/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.createRegisterForm();
  }

  createRegisterForm(): FormGroup {
    return this.fb.group(
      {
        name: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, Validators.required],
        password2: [null, Validators.required],
        condiciones: [false],
      },
      { validators: confirmValidator('password', 'password2') }
    );
  }

  isInvalid(controlName: string) {
    return (
      this.control(controlName)?.touched && this.control(controlName)?.invalid
    );
  }

  confirmValidator() {
    return (
      this.registerForm.errors?.confirmValidator &&
      this.registerForm.get('password2')?.touched &&
      this.registerForm.get('password2')?.dirty
    );
  }

  control(name: string): AbstractControl | null {
    return this.registerForm.get(name);
  }

  createUser() {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    if (!this.registerForm.value.condiciones) {
      Swal.fire({
        icon: 'info',
        title: 'Espere!!!',
        text: 'Debe aceptar los terminos y condiciones',
      });
      return;
    }
    const { name, email, password } = this.registerForm.value;
    let user = new User(name, email, password);
    this._userService
      .register(user)
      .subscribe((resp) => this.router.navigate(['/login']));
  }
}
