import { Component } from '@angular/core';
import { MenuSection } from '../../interfaces/menu.interface';
import { UserRole } from '../../core/enum/user-role.enum';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoutesEnum } from '../../core/enum/routes.enum';
import { LocalStorageService } from '../../services/local/local-storage.service';
import { Router } from '@angular/router';
import { LocalStorageUsuarioService } from '../../services/local/local-storage-usuario.service';


@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

userRole: UserRole = UserRole.ADMINISTRADOR;

  constructor(private localStorageService: LocalStorageService, private router: Router, private localStorageUsuarioService: LocalStorageUsuarioService) {
    this.userRole = this.localStorageUsuarioService.getUsuario().rol.rol;
  }

  menu: MenuSection[] = [
    {
      title: 'PRINCIPAL',
      items: [
        {
          icon: 'bi bi-bar-chart',
          label: 'Dashboard',
          route: RoutesEnum.DASHBOARD,
          roles: [UserRole.ADMINISTRADOR, UserRole.INFORMATICA, UserRole.ALMACEN]
        }
      ]
    },
    {
      title: 'MIS GESTIONES',
      items: [
        {
          icon: 'bi bi-plus-lg',
          label: 'Nueva Solicitud',
          route: RoutesEnum.SOLICITUD,
          roles: [UserRole.ADMINISTRADOR, UserRole.INFORMATICA, UserRole.SOLICITANTE]
        },
        {
          icon: 'bi bi-card-list',
          label: this.userRole === UserRole.SOLICITANTE
            ? 'Mi Historial'
            : 'Historial',
          route: RoutesEnum.HISTORIAL,
          roles: [UserRole.ADMINISTRADOR, UserRole.INFORMATICA, UserRole.SOLICITANTE, UserRole.ALMACEN]
        }
      ]
    },
    {
      title: 'VALIDACIÓN',
      items: [
        {
          icon: 'bi bi-shield-check',
          label: 'Pendientes TI',
          route: RoutesEnum.INFORMATICA,
          roles: [UserRole.ADMINISTRADOR, UserRole.INFORMATICA]
        }
      ]
    },
    {
      title: 'LOGÍSTICA',
      items: [
        {
          icon: 'bi bi-box-seam',
          label: 'Despacho Almacen',
          route: RoutesEnum.ALMACEN,
          roles: [UserRole.ADMINISTRADOR, UserRole.ALMACEN]
        }
      ]
    },
    {
      title: 'CONFIGURACION',
      items: [
        {
          icon: 'bi bi-people',
          label: 'Usuarios y Roles',
          route: RoutesEnum.USUARIOS,
          roles: [UserRole.ADMINISTRADOR]
        },
        {
          icon: 'bi bi-printer',
          label: 'Impresoras',
          route: RoutesEnum.IMPRESORAS,
          roles: [UserRole.ADMINISTRADOR]
        },
        {
          icon: 'bi bi-building',
          label: 'Sedes',
          route: RoutesEnum.SEDES,
          roles: [UserRole.ADMINISTRADOR]
        }
      ]
    }
  ];

  get filteredMenu(): MenuSection[] {

    return this.menu
      .map(section => ({
        ...section,
        items: section.items.filter(item =>
          item.roles.includes(this.userRole)
        )
      }))
      .filter(section => section.items.length > 0);

  }

  logout() {
    this.localStorageService.logoutSession();
    this.router.navigate(['/login']);
  }


}
