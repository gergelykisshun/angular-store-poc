import { Component, OnInit } from "@angular/core";
import { ICart } from "./models/cart.model";
import { CartService } from "./services/cart.service";

@Component({
  selector: "app-root",
  template: `<app-header [cart]="cart"></app-header>
    <router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent implements OnInit {
  cart: ICart = { items: [] };

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart.subscribe((cart) => (this.cart = cart));
  }
}
