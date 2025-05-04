import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() totalPages: number = 0;
  @Input() page: number = 1;
  @Input() itemsPerPage: number = 10;
  @Input() itemsPerPageOptions: number[] = [10, 20, 30, 40];

  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  get collectionSize() {
    return this.totalPages * this.itemsPerPage;
  }

  onPageChange(newPage: number): void {
    this.pageChange.emit(newPage);
  }

  onItemsPerPageChange(newItemsPerPage: number): void {
    this.itemsPerPageChange.emit(newItemsPerPage);
  }
}
