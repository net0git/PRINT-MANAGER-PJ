import { Component } from '@angular/core';
import { SidebarComponent } from '../../layouts/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../../layouts/topbar/topbar.component';

@Component({
  selector: 'app-principal',
  imports: [SidebarComponent, TopbarComponent, RouterOutlet],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

}
