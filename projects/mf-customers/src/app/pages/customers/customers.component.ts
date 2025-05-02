import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import '@angular/localize/init';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-customers',
  imports: [CardComponent, NgbPaginationModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent {
  page = 1;
}
