import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { filter, map, Subscription } from 'rxjs';
import { ModalsService } from '../../services/modals.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  dismissModalSubscription!: Subscription;
  openModalSubscription!: Subscription;

  @Input() options!: {
    centered: boolean;
  };

  @Input() modalType!: 'action' | 'danger' | 'validation'

  @Input() title!: string;

  modalHide = true;
  modalHidden = true;

  @Input() footerDismissButton = true;

  @Input() modalName!: string;

  @Output() modalDismissed = new EventEmitter<void>();

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

  openModal(): void {
    this.modalHide = false;
    setTimeout(() => {
      this.modalHidden = false;
    }, 600);
  }

  dismissModal(): void {
    this.modalHidden = true;
    setTimeout(() => {
      this.modalHide = true;
    }, 600);
    this.modalDismissed.emit();
  }

  ngOnDestroy(): void {
    this.dismissModalSubscription.unsubscribe();
  }

}
