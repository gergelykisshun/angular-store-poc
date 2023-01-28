import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IProduct } from "src/app/models/product.model";

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box.component.html",
})
export class ProductBoxComponent implements OnInit {
  @Input() product: IProduct | undefined;
  @Input() fullWidthMode = false;

  @Output() emitProduct = new EventEmitter<IProduct>();

  constructor() {}

  ngOnInit(): void {}

  addToCart(): void {
    this.emitProduct.emit(this.product);
  }
}
