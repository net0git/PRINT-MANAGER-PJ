import { UserRole } from "../core/enum/user-role.enum";

export interface MenuItem {
  icon: string;
  label: string;
  route: string;
  roles: UserRole[]; // Opcional, para controlar la visibilidad según el rol del usuario
}

export interface MenuSection {
  title: string;
  items: MenuItem[];

}