import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() id!: string;
  element: any;

  dropdownHidden = true;

  dropdownBtn!: HTMLElement;
  dropdownContainer!: HTMLElement;

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.element = this.el.nativeElement;
    this.dropdownBtn = <HTMLElement>this.element.querySelector('[data-toggle="dropdown"]');
    this.dropdownContainer = <HTMLElement>this.element.querySelector('[aria-labelledby="dropdown"]');
    this.dropdownBtn.addEventListener('click', () => {
      this.toggleDropdown()
    });
    const dropdownElements = this.dropdownContainer.querySelectorAll('li');
    dropdownElements.forEach(element => {
      element.addEventListener('click', () => {
        this.dismissDropdown();
      });
    });
    document.addEventListener('click', (event: Event) => {
      const target = <HTMLElement>event.target;
      if (!target.closest(`#${this.id}`)) {
        this.dismissDropdown();
      }
    });
  }

  toggleDropdown(): void {
    const dropdownContainerClasses = this.dropdownContainer.className.split(' ');
    const dropdownContainerHiddenClassIndex = dropdownContainerClasses.findIndex(el => el === 'hidden');
    if (dropdownContainerHiddenClassIndex === -1) {
      dropdownContainerClasses.push('hidden');
      this.dropdownHidden = true;
    } else {
      dropdownContainerClasses.splice(dropdownContainerHiddenClassIndex, 1);
      this.dropdownHidden = false;
    }
    this.dropdownContainer.className = dropdownContainerClasses.join(' ');
  }

  dismissDropdown(): void {
    const dropdownContainerClasses = this.dropdownContainer.className.split(' ');
    if (!this.dropdownHidden) {
      dropdownContainerClasses.push('hidden');
      this.dropdownHidden = true;
    }
    this.dropdownContainer.className = dropdownContainerClasses.join(' ');
  }

}
