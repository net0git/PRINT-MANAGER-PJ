import { Routes } from '@angular/router';
import { RoutesEnum } from './infrastructure/core/enum/routes.enum';
import { LoginComponent } from './infrastructure/pages/login/login.component';
import { PrincipalComponent } from './infrastructure/pages/principal/principal.component';
import { DashboardComponent } from './infrastructure/shared/components/dashboard/dashboard.component';
import { UsuariosComponent } from './infrastructure/shared/components/usuarios/usuarios.component';
import { ImpresorasComponent } from './infrastructure/shared/components/impresoras/impresoras.component';
import { HistorialComponent } from './infrastructure/shared/components/historial/historial.component';
import { AlmacenComponent } from './infrastructure/shared/components/almacen/almacen.component';
import { InformaticaComponent } from './infrastructure/shared/components/informatica/informatica.component';
import { SolicitudComponent } from './infrastructure/shared/components/solicitud/solicitud.component';
import { ImpresorasConfigComponent } from './infrastructure/shared/components/impresoras/impresoras-config/impresoras-config.component';
import { SedesComponent } from './infrastructure/shared/components/sedes/sedes.component';
import { authGuard } from './infrastructure/core/auth/auth.guard';
import { ResetCuentaComponent } from './infrastructure/pages/reset-cuenta/reset-cuenta.component';
import { AutoRegistroComponent } from './infrastructure/pages/auto-registro/auto-registro.component';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reset-cuenta',
    component: ResetCuentaComponent
  },
  {
    path: 'registro',
    component: AutoRegistroComponent
  },
  {
    path: 'principal',
    component: PrincipalComponent,
    canActivate: [authGuard],
    children: [
      {
        path: RoutesEnum.DASHBOARD,
        component: DashboardComponent
      },
      {
        path: RoutesEnum.SOLICITUD,
        component: SolicitudComponent
      },
      {
        path: RoutesEnum.HISTORIAL, 
        component: HistorialComponent
      },
      {
        path: RoutesEnum.INFORMATICA,
        component: InformaticaComponent
      },
      {
        path: RoutesEnum.ALMACEN,
        component: AlmacenComponent
      },
      {
        path: RoutesEnum.USUARIOS,
        component: UsuariosComponent
      },
      {
        path: RoutesEnum.IMPRESORAS,
        component: ImpresorasComponent,
      },
      {
        path: RoutesEnum.IMPRESORAS_CONFIG,
        component: ImpresorasConfigComponent
      },
      {
        path: RoutesEnum.SEDES,
        component: SedesComponent
      }

    ] 
  }



];
