import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { StoreService } from "src/app/services/store.service";

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  columnsCount = 3;
  rowHeight = ROWS_HEIGHT[this.columnsCount];

  selectedCategory: string | undefined;

  products: IProduct[] = [];
  sort = "desc";
  limit = 10;
  productsSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.getProducts();
  }

  // when the component unmounts unsub from the services
  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.limit, this.sort, this.selectedCategory)
      .subscribe((products) => (this.products = products));
  }

  changeColumnsCount(nbrOfColumns: number): void {
    this.columnsCount = nbrOfColumns;
    this.rowHeight = ROWS_HEIGHT[this.columnsCount];
  }

  changeSort(newSort: "asc" | "desc"): void {
    this.sort = newSort;
    this.getProducts();
  }

  changeLimit(newLimit: number): void {
    this.limit = newLimit;
    this.getProducts();
  }

  catchEmitedCategory(category: string): void {
    if (category === "ALL") {
      this.selectedCategory = undefined;
    } else {
      this.selectedCategory = category;
    }

    this.getProducts();
  }

  catchEmitedProduct(product: IProduct): void {
    this.cartService.addToCart({
      id: product.id,
      image: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
    });
  }
}
