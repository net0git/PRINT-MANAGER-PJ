import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RolesEnum } from '../../../core/enum/roles.enum';
import { UserService } from '../../../../infrastructure/services/remoto/user/user.service';
import { UserUseCasesService } from '../../../../useCase/user/user-use-cases.service';
import { UserDelete, UserResponse } from '../../../../domain/dto/userResponse.dto';
import { UserRequest } from '../../../../domain/dto/userRequest.dto';
import { RolResponse } from '../../../../domain/dto/rolResponse.dto';
import { RolService } from '../../../services/remoto/rol/rol.service';
import { SoloLetrasDirective } from '../../../core/directives/solo-letras.directive';
import { SoloNumerosDirective } from '../../../core/directives/solo-numeros.directive';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, FormsModule, SoloLetrasDirective, SoloNumerosDirective],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {

  isModalOpen = false;
  isActive: boolean = true;
  modificarUsuario: boolean = false;

  roles = Object.values(RolesEnum);
  rolSeleccionado: number = 0;

  listUsers: UserResponse[] = [];
  listUsersTemp: UserResponse[] = [];

  userForm: UserRequest = {
    nombre: '',
    ap_paterno: '',
    ap_materno: '',
    correo: '',
    telefono: '',
    username: '',
    password: '',
    id_rol: 0,
    estado: false
  };

  rolList: RolResponse[] = [];

  openModalUsuarioCreate() {
    this.isModalOpen = true;
    this.limpiarFormulario();
  }

  openModalUsuarioUpdate(user: UserRequest) {
    this.userForm = user;
    this.rolSeleccionado = user.id_rol;
    this.isActive = user.estado;
    this.isModalOpen = true;
    this.modificarUsuario = true;
  }

  closeModalUsuario() {
    this.isModalOpen = false;
  }

  roleClassMap: Record<string, string> = {
    Solicitante: 'dot-gray',
    Informatica: 'dot-blue',
    Almacen: 'dot-purple',
    Administrador: 'dot-red'
  };




  constructor(private userService: UserService, private rolService: RolService, private userUseCasesService: UserUseCasesService) { }
  ngOnInit(): void {
    this.getAllUsers();
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

  getRoleClass(role: string): string {
    return this.roleClassMap[role] || 'dot-default';
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data: UserResponse[]) => {
        this.listUsers = data;
        this.listUsersTemp = data;
        console.log(data);
      },
      error: (err) => {
        console.error("error login", err);
      },
      complete: () => {
        console.log("getAllUsers completo");
      }
    });
  }

  getAllRols() {
    this.rolService.getRolList().subscribe({
      next: (data: RolResponse[]) => {
        this.rolList = data;
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

  Action() {
    if (this.modificarUsuario) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createUser() {
    const userBodyTem = {
      nombre: this.userForm.nombre,
      ap_paterno: this.userForm.ap_paterno,
      ap_materno: this.userForm.ap_materno,
      correo: this.userForm.correo,
      telefono: this.userForm.telefono,
      username: this.userForm.username,
      password: '123456',
      id_rol: this.rolSeleccionado,
      estado: this.isActive
    };
    console.log("userBodyTem:", userBodyTem);

    this.userUseCasesService.createUser(userBodyTem).subscribe({
      next: (data: UserResponse) => {
        console.log('Usuario creado', data);
        this.getAllUsers()
        this.closeModalUsuario();
        this.mostrarToast('success', 'Usuario creado correctamente');
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error('Error de validación:', err.message);
          this.mostrarToast('error', `Error de validación: ${err.message}`);
          return;
        }
        console.error('Error del servidor:', err);
        this.mostrarToast('error', 'Error en el servidor');

      }
    });
  }

  updateUser() {
    const userBodyTem = {
      id_usuario: this.userForm.id_usuario,
      nombre: this.userForm.nombre,
      ap_paterno: this.userForm.ap_paterno,
      ap_materno: this.userForm.ap_materno,
      correo: this.userForm.correo,
      telefono: this.userForm.telefono,
      username: this.userForm.username,
      password: this.userForm.password,
      id_rol: this.rolSeleccionado,
      estado: this.isActive
    };
    console.log("userBodyTem:", userBodyTem);

    this.userUseCasesService.updateUser(userBodyTem.id_usuario!, userBodyTem).subscribe({
      next: (data: UserResponse) => {
        console.log('Usuario actualizado', data);
        this.getAllUsers();
        this.closeModalUsuario();
        this.mostrarToast('success', 'Usuario actualizado correctamente');
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error('Error de validación:', err.message);
          this.mostrarToast('error', `Error de validación: ${err.message}`);
          return;
        }
        console.error('Error del servidor:', err);
        this.mostrarToast('error', 'Error en el servidor');
      }
    });
  }

  deleteUser(id_usuario: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id_usuario).subscribe({
          next: (data: UserDelete) => {
            console.log("Usuario eliminado", data);
          },
          error: (err) => {
            console.error("Error al eliminar usuario:", err);

            if (err.status === 409) {
              Swal.fire({
                title: "No se puede eliminar",
                text: err.error?.message || "El usuario está asociado a uno o más tickets.",
                icon: "error"
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "La petición no pudo ser procesada. Verifique la conexión con el servidor.",
                icon: "error"
              });
            }
          },
          complete: () => {
            console.log("deleteUser completo");
            this.getAllUsers();

            Swal.fire({
              title: "Eliminado",
              text: "El usuario ha sido eliminado correctamente.",
              icon: "success"
            });
          }
        });
      }
    });
  }

  buscarEnObjeto(event: any) {
    // this.p = 1
    const textoBusqueda =
      event.target.value.toLowerCase();

    this.listUsers = this.listUsersTemp.filter(user => {

      const nombreCompleto = `
      ${user.nombre}
      ${user.ap_paterno}
      ${user.ap_materno}
    `.toLowerCase();

      return nombreCompleto.includes(textoBusqueda);
    });
  }

  exportToExcel(): void {

    const data = this.listUsers.map(user => ({
      Nombre: user.nombre,
      ApellidoPaterno: user.ap_paterno,
      ApellidoMaterno: user.ap_materno,
      Correo: user.correo,
      Telefono: user.telefono,
      Rol: user.rol,
      Estado: user.estado ? 'ACTIVO' : 'INACTIVO'
    }));

    const worksheet: XLSX.WorkSheet =
      XLSX.utils.json_to_sheet(data);

    const workbook: XLSX.WorkBook = {
      Sheets: {
        Usuarios: worksheet
      },
      SheetNames: ['Usuarios']
    };

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });

    const file = new Blob(
      [excelBuffer],
      {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    );

    saveAs(file, 'usuarios.xlsx');
  }

  limpiarFormulario() {
    this.userForm.nombre = '';
    this.userForm.ap_paterno = '';
    this.userForm.ap_materno = '';
    this.userForm.correo = '';
    this.userForm.telefono = '';
    this.userForm.username = '';
    this.userForm.password = '';
    this.userForm.id_rol = 0;
    this.userForm.estado = false;
    this.rolSeleccionado = 0;
    this.isActive = true;
    this.modificarUsuario = false;
  }

}
