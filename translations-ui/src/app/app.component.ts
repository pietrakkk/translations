import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
  if (confirm('Czy na pewno chcesz przerwać naprawę translacji?')) {
      return true;
    }
    return false;
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event) {
    if (confirm('Czy na pewno chcesz przerwać naprawę translacji?')) {
      return true;
    }
    return false;
  }

}
