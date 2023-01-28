import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
})
export class ProductsHeaderComponent implements OnInit {
  @Output() changeColumnsCount = new EventEmitter<number>();
  @Output() changeSort = new EventEmitter<"desc" | "asc">();
  @Output() changeLimit = new EventEmitter<number>();

  @Input() sort = "desc";
  @Input() nbrOfItems = 10;
  possibleNbrOfItems = [10, 15, 20];

  constructor() {}

  ngOnInit(): void {}

  onSortUpdated(newSort: "desc" | "asc"): void {
    this.changeSort.emit(newSort);
  }

  changeNbrOfItems(newNbr: number): void {
    this.changeLimit.emit(newNbr);
  }

  updateColumns(columnsNbr: number): void {
    this.changeColumnsCount.emit(columnsNbr);
  }
}
