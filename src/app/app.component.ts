import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    document.addEventListener('click', e => {
      if (e.target) {
        let elem = (<HTMLElement>e.target);

        this.closeAllDropdowns();
        this.showDropdown(elem);
      }
    });
  }

  showDropdown(elem: HTMLElement): void {
    let isDropdownControl = elem.classList.contains('dropdown-toogle');
    if (isDropdownControl) {
      let dropdown = (<HTMLElement> elem.nextElementSibling);
      if (dropdown.style.display == 'none' || dropdown.style.display == '') 
        dropdown.style.display = 'block';
      else
        dropdown.style.display = 'none';
    }
  }

  closeAllDropdowns(): void {
    let dropdowns = document.getElementsByClassName('dropdown');
    if (dropdowns) {
      for (let i = 0; i < dropdowns.length; i++) {
        (<HTMLElement>dropdowns[i]).style.display = 'none';
      }
    }
  }
}
