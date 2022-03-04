import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { ModalsService } from '../../services/modals.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {

  dismissModalSubscription!: Subscription;
  openModalSubscription!: Subscription;

  @Input() options!: {
    centered: boolean;
  };

  modalHide = true;
  modalHidden = true;

  @Input() footerDismissButton = true;

  @Input() modalName!: string;

  @Output() modalDismissed = new EventEmitter<void>();
  @Output() modalOpened = new EventEmitter<void>();

  constructor(
    private modalsService: ModalsService
  ) { }

  ngOnInit(): void {
    this.dismissModalSubscription = this.modalsService.dismissAllModals$.subscribe({
      next: () => this.dismissModal()
    });
    this.openModalSubscription = this.modalsService.openModal$
    .pipe(
      filter(value => value === this.modalName)
    ).subscribe({
      next: () => this.openModal()
    });

  }

  ngAfterViewInit(): void {
    const dismissButtons = document.querySelectorAll('[data-dismiss="modal"]');
    dismissButtons.forEach((el) => {
      el.addEventListener('click', () => {
        this.dismissModal();
      });
    });
  }

  openModal(): void {
    this.modalHide = false;
    setTimeout(() => {
      this.modalHidden = false;
    }, 350);
    this.modalOpened.emit();
  }

  dismissModal(): void {
    this.modalHidden = true;
    setTimeout(() => {
      this.modalHide = true;
    }, 350);
    this.modalDismissed.emit();
  }

  ngOnDestroy(): void {
    this.dismissModalSubscription.unsubscribe();
  }

}
