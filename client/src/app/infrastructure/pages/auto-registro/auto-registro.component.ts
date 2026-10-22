import { ChangeDetectionStrategy, Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoloLetrasDirective } from '../../core/directives/solo-letras.directive';
import { SoloNumerosDirective } from '../../core/directives/solo-numeros.directive';
import { FormsModule } from '@angular/forms';
import { UserRequest } from '../../../domain/dto/userRequest.dto';
import { RolResponse } from '../../../domain/dto/rolResponse.dto';
import { RolService } from '../../services/remoto/rol/rol.service';
import { UserResponse } from '../../../domain/dto/userResponse.dto';
import { UserUseCasesService } from '../../../useCase/user/user-use-cases.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auto-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, SoloLetrasDirective, SoloNumerosDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './auto-registro.component.html',
  styleUrl: './auto-registro.component.scss'
})
export class AutoRegistroComponent implements OnInit {

  formData = signal<UserRequest>({
    nombre: '',
    ap_paterno: '',
    ap_materno: '',
    correo: '',
    telefono: '',
    username: '',
    password: '',
    id_rol: 0,
    estado: true
  });

  registeredUser = signal<UserRequest | null>(null);

  generatedUsername = signal<string>('');
  generatedPassword = signal<string>('123456');

  isLoading = signal<boolean>(false);
  isSuccess = signal<boolean>(false);
  generalError = signal<string>('');
  isCopied = signal<boolean>(false);
  id_rol = signal<number>(0);

  rolList = signal<RolResponse[]>([]);

  rolSeleccionado = computed(() => {
    const idRol = this.registeredUser()?.id_rol;
    return this.rolList().find(item => item.id_rol === idRol)?.rol ?? 'Sin rol';
  });



  // Actualizar un campo del formulario
  updateFormField(
    field: keyof UserRequest,
    event: Event
  ): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const value = target.value;

    this.formData.update(data => ({
      ...data,
      [field]: field === 'id_rol' ? Number(value) : value
    }));

    if (this.generalError()) {
      this.generalError.set('');
    }
  }

  constructor(private rolService: RolService, private userUseCasesService: UserUseCasesService, private router: Router) { }

  ngOnInit(): void {
    this.getAllRols();
  }

  private mostrarToast(
    icon: 'success' | 'error' | 'warning' | 'info',
    title: string
  ): void {
    Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    }).fire({
      icon,
      title
    });
  }

  getAllRols() {
    this.rolService.getRolList().subscribe({
      next: (data: RolResponse[]) => {
        this.rolList.set(data);
        console.log(data);
      },
      error: (err) => {
        console.error("error login", err);
      },
      complete: () => {
        console.log("getAllRols completo");
      }
    });
  }

  //   private setRolSeleccionado(idRol: number): void {
  //   const rol = this.rolList().find(item => item.id_rol === idRol);
  //   this.rolSeleccionado = rol?.rol ?? 'Sin rol';
  // }

  // Generar nombre de usuario
  private createUsername(correo: string): string {
    return correo
      .trim()
      .toLowerCase()
      .split('@')[0];
  }

  // Generar contraseña inicial
  private createRandomPassword(): string {
    return '123456';
  }

  // Registrar usuario
  handleRegister(event: Event): void {
    event.preventDefault();

    const data = this.formData();

    // Validar campos obligatorios
    if (
      !data.nombre.trim() ||
      !data.ap_materno.trim() ||
      !data.ap_paterno.trim() ||
      !data.correo.trim() ||
      !data.telefono.trim() ||
      !data.id_rol
    ) {
      this.generalError.set(
        'Por favor, completa todos los campos obligatorios (*).'
      );

      return;
    }

    // Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.correo.trim())) {
      this.generalError.set(
        'Ingresa una dirección de correo electrónico válida.'
      );

      return;
    }

    this.generalError.set('');
    this.isLoading.set(true);

    // Simulación de llamada al backend
    setTimeout(() => {
      const username = this.createUsername(data.correo);
      const password = this.createRandomPassword();

      this.registeredUser.set({
        ...data,
        username,
        password
      });

      this.generatedUsername.set(username);
      this.generatedPassword.set(password);

      this.isLoading.set(false);



      console.log('datos usuario', this.registeredUser());

      this.userUseCasesService.executeAutoRegister(this.registeredUser()!).subscribe({
        next: (data: UserResponse) => {
          console.log('Usuario creado', data);
          this.isSuccess.set(true);
        },
        error: (err) => {
          console.error('Error:', err);

          if (err instanceof Error && err.message === 'El usuario ya existe') {
            this.generalError.set('El usuario ya existe.');
            // this.mostrarToast('error', 'El usuario ya existe.');
            return;
          }

          this.generalError.set('Ocurrió un error en el servidor.');
          this.mostrarToast('error', 'Ocurrió un error en el servidor.');
          this.isSuccess.set(false);
        }
      });

    }, 700);
  }



  // Obtener clase visual según el rol
  getRoleBadgeClass(rol?: string): string {

    switch (rol) {

      case 'informatica':
        return 'role-badge role-informatica';

      case 'almacen':
        return 'role-badge role-almacen';

      case 'solicitante':
        return 'role-badge role-solicitante';

      default:
        return 'role-badge role-default';
    }
  }

  // Obtener nombre visible del rol
  getRoleLabel(rol?: string): string {

    switch (rol) {

      case 'informatica':
        return 'Informática';

      case 'almacen':
        return 'Almacén';

      case 'solicitante':
        return 'Solicitante';

      default:
        return rol || '-';
    }
  }

  // Copiar contraseña
  copyPassword(): void {

    const password = this.generatedPassword();

    if (!password) {
      return;
    }

    if (
      navigator.clipboard &&
      navigator.clipboard.writeText
    ) {

      navigator.clipboard
        .writeText(password)
        .then(() => {
          this.showCopiedState();
        })
        .catch(() => {
          this.copyPasswordFallback(password);
        });

    } else {
      this.copyPasswordFallback(password);
    }
  }

  // Método alternativo para copiar
  private copyPasswordFallback(password: string): void {

    const textarea = document.createElement('textarea');

    textarea.value = password;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    document.execCommand('copy');

    document.body.removeChild(textarea);

    this.showCopiedState();
  }

  // Mostrar estado de contraseña copiada
  private showCopiedState(): void {

    this.isCopied.set(true);

    setTimeout(() => {
      this.isCopied.set(false);
    }, 2000);
  }

  // Reiniciar formulario
  resetForm(): void {

    this.formData.set({
      nombre: '',
      ap_paterno: '',
      ap_materno: '',
      correo: '',
      telefono: '',
      id_rol: 0,
      username: '',
      password: '',
      estado: false
    });

    this.registeredUser.set(null);

    this.generatedUsername.set('');
    this.generatedPassword.set('');

    this.isSuccess.set(false);
    this.isLoading.set(false);
    this.generalError.set('');
    this.isCopied.set(false);
  }

  volver() {
    this.router.navigate(['/login']);
  }
}