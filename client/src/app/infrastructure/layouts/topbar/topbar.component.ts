import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { RoutesEnum } from '../../core/enum/routes.enum';
import { LocalStorageUsuarioService } from '../../services/local/local-storage-usuario.service';
import { NotificationService } from '../../services/local/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit {
  pageTitle: string = 'Dashboard';
  userName: string = 'admin';
  userRole: string = 'Administrador';

  cantidadNotificaciones = 0;
  estado: string = 'I';

  constructor(private router: Router, private localStorageUsuarioService: LocalStorageUsuarioService, private notificationService: NotificationService) { }
  ngOnInit(): void {
    this.updateTitle(this.router.url);
    this.getUserNameRol();
    this.notificationService.state$
  .subscribe(state => {
    this.cantidadNotificaciones = state.cantidad;
    this.estado = state.estado;
  });
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {

        this.updateTitle(event.urlAfterRedirects);

      });
  }

  updateTitle(url: string): void {

    const titles: Record<string, string> = {

      [`/principal/${RoutesEnum.DASHBOARD}`]:
        'Panel General',

      [`/principal/${RoutesEnum.SOLICITUD}`]:
        'Nueva Solicitud',

      [`/principal/${RoutesEnum.HISTORIAL}`]:
        'Mi Historial',

      [`/principal/${RoutesEnum.INFORMATICA}`]:
        'Pendientes TI',

      [`/principal/${RoutesEnum.ALMACEN}`]:
        'Despacho Almacén',

      [`/principal/${RoutesEnum.USUARIOS}`]:
        'Usuarios y Roles',

      [`/principal/${RoutesEnum.IMPRESORAS}`]:
        'Impresoras',

      [`/principal/${RoutesEnum.IMPRESORAS_CONFIG}`]:
        'Impresoras'
    };

    this.pageTitle = titles[url] || 'Sistema';
  }


  getUserNameRol() {
    const user = this.localStorageUsuarioService.getUsuario();
    console.log('usuario encontrado:', user);
    this.userName = user.nombre;
    this.userRole = user.rol.rol;
  }

}
