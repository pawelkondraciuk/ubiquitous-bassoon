import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-select-currency',
  templateUrl: './select-currency.component.html',
  styleUrls: ['./select-currency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectCurrencyComponent {
  @Input() currencies: string[];
  @Input() currency: string;
  @Output() currencyChange = new EventEmitter<string>();

  onCurrencyClick(currency: string) {
    this.currencyChange.emit(currency);
  }
}
