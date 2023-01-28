import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { loadStripe } from "@stripe/stripe-js";
import { ICart, ICartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  cart: ICart = {
    items: [],
  };

  dataSource: ICartItem[] = [];

  displayedColumns: string[] = [
    "image",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((cart) => {
      this.cart = cart;
      this.dataSource = cart.items;
    });
  }

  getTotal(items: ICartItem[]): number {
    return this.cartService.getTotal(items);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  clearItemFromCart(item: ICartItem): void {
    this.cartService.clearCartItem(item);
  }

  increaseItemQuantity(cartItem: ICartItem): void {
    this.cartService.increaseQuantityOfItem(cartItem);
  }

  decreaseItemQuantity(cartItem: ICartItem): void {
    this.cartService.decreaseQuantityOfItem(cartItem);
  }

  onCheckout(): void {
    this.http
      .post("http://localhost:4242/checkout", {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(environment.STRIPE_KEY);
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
}
