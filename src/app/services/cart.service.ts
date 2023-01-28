import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { ICart, ICartItem } from "../models/cart.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<ICart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: ICartItem): void {
    const items = [...this.cart.value.items];

    const itemFoundInCart = items.find((cartItem) => cartItem.id === item.id);

    if (itemFoundInCart) {
      itemFoundInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });

    this._snackBar.open("1 item added to cart!", "Ok", { duration: 3000 });
  }

  getTotal(cartItems: ICartItem[]): number {
    return cartItems.reduce((prev, cur) => prev + cur.price * cur.quantity, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open("Cart is cleared!", "Ok", { duration: 3000 });
  }

  clearCartItem(cartItem: ICartItem): void {
    const newItems = this.cart.value.items.filter(
      (item) => item.id !== cartItem.id
    );
    this.cart.next({ items: newItems });
    this._snackBar.open(`Removed ${cartItem.name} from your cart`, "Ok", {
      duration: 3000,
    });
  }

  increaseQuantityOfItem(cartItem: ICartItem): void {
    const newItems = this.cart.value.items;

    const itemFound = newItems.find((item) => item.id === cartItem.id);

    if (itemFound) {
      itemFound.quantity += 1;
    }

    this.cart.next({ items: newItems });
    this._snackBar.open("Added an item to the cart!", "Ok", { duration: 3000 });
  }

  decreaseQuantityOfItem(cartItem: ICartItem): void {
    const newItems = this.cart.value.items;

    const itemFound = newItems.find((item) => item.id === cartItem.id);

    if (itemFound) {
      itemFound.quantity -= 1;
    }

    this.cart.next({ items: newItems.filter((item) => item.quantity !== 0) });
    this._snackBar.open("Removed an item from the cart!", "Ok", {
      duration: 3000,
    });
  }
}
