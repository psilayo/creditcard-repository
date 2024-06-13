import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'credit-card-app';

  sidebarOpen = true;
   
  toggleSidebar() {
  this.sidebarOpen = this.sidebarOpen? false : true;
   };
}
