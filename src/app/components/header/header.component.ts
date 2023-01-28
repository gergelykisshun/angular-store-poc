import { Component, Input, OnInit } from "@angular/core";
import { ICart, ICartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  private _cart: ICart = { items: [] };

  itemsQuantity = 0;

  @Input()
  get cart(): ICart {
    return this._cart;
  }

  set cart(cart: ICart) {
    this._cart = cart;

    this.itemsQuantity = cart.items.reduce(
      (prev, cur) => prev + cur.quantity,
      0
    );
  }

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  getTotal(items: ICartItem[]): number {
    return this.cartService.getTotal(items);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
