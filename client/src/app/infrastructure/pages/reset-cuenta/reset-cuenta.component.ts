import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserUseCasesService } from '../../../useCase/user/user-use-cases.service';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../../infrastructure/services/remoto/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-cuenta',
  imports: [RouterLink],
  templateUrl: './reset-cuenta.component.html',
  styleUrl: './reset-cuenta.component.scss'
})
export class ResetCuentaComponent {

  username = signal<string>('');
  submittedUser = signal<string>('');
  newPassword = signal<string>('');
  isLoading = signal<boolean>(false);
  isSuccess = signal<boolean>(false);
  errorMessage = signal<string>('');
  isCopied = signal<boolean>(false);

  constructor(private userUseCasesService: UserUseCasesService,
    private router: Router,
    private userService: UserService
  ) { }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.username.set(target.value);

    if (this.errorMessage()) {
      this.errorMessage.set('');
    }
  }

  // private generateRandomPassword(): string {
  //   let password = '123456';
  //   return password;
  // }

  async handleRestore(e: Event): Promise<void> {
    e.preventDefault();

    const username = this.username().trim();

    if (!username) {
      this.errorMessage.set('Por favor, ingresa tu nombre de usuario.');
      return;
    }

    this.errorMessage.set('');
    this.isLoading.set(true);

    try {
      const response = await firstValueFrom(
        this.userService.findByUsername(username)
      );

      if (!response.exists) {
        this.errorMessage.set('No existe el usuario.');
        return;
      }

      const password = '123456';

      await firstValueFrom(
        this.userService.resetPassword(username, password)
      );

      this.submittedUser.set(username);
      this.newPassword.set(password);
      this.isSuccess.set(true);

    } catch (error) {
      console.error('Error al restablecer contraseña:', error);
      this.errorMessage.set('Ocurrió un error en el servidor. Inténtalo más tarde.');
    } finally {
      this.isLoading.set(false);
    }
  }

  copyPassword(): void {
    const pwd = this.newPassword();

    if (!pwd) {
      return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(pwd).then(() => {
        this.showCopiedState();
      });
    } else {
      const dummy = document.createElement('textarea');

      document.body.appendChild(dummy);

      dummy.value = pwd;
      dummy.select();

      document.execCommand('copy');

      document.body.removeChild(dummy);

      this.showCopiedState();
    }
  }

  private showCopiedState(): void {
    this.isCopied.set(true);

    setTimeout(() => {
      this.isCopied.set(false);
    }, 2000);
  }

  resetForm(keepUser: boolean): void {
    this.isSuccess.set(false);
    this.isLoading.set(false);
    this.errorMessage.set('');
    this.isCopied.set(false);
    this.newPassword.set('');

    // if (!keepUser) {
    this.username.set('');
    // }
  }

  // RESTABLECER CONTRASEÑA

  async executeResetPassword() {

    const username = this.username();
    const exists = this.userService.findByUsername(username);

    if (!exists) {
      throw new Error("No existe el usuario");
    }

    console.log(username);
    return await firstValueFrom(
      this.userService.resetPassword(username, "123456")
    );
  }

  volver() {
    this.router.navigate(['/login']);
  }
}