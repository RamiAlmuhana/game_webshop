import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  public products: Product[] = [];
  public loadingProducts = true;
  public selectedSortOrder: string = 'default';
  public filteredProducts: Product[] = [];
  public searchTerm: String = '';
  public minPrice: number = 0;
  public maxPrice: number = 0;



  constructor(private productsService: ProductsService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.applySort();
    const prices = this.products.map(product => product.price);
    this.minPrice = Math.min(...prices);
    this.maxPrice = Math.max(...prices);
  }



  loadProducts(): void {
    this.productsService.getProducts().subscribe((products: Product[]) => {
      this.loadingProducts = false;
      this.products = products;
      this.filteredProducts = products;
    });
  }

  onBuyProduct(product: Product): void {
    this.cartService.addProductToCart(product);
  }

  applySort(): void {
    if (this.selectedSortOrder === 'lowToHigh') {
      this.filteredProducts = this.products.slice().sort((a, b) => a.price - b.price);
    } else if (this.selectedSortOrder === 'highToLow') {
      this.filteredProducts = this.products.slice().sort((a, b) => b.price - a.price);
    } else {
      // Revert to original order
      this.filteredProducts = this.products.slice();
    }
  }

  filterByName() {
    this.filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  public filterProducts(): void {
    // Ensure minPrice is not negative
    if (this.minPrice < 0) {
      this.minPrice = 0;
    }

    this.filteredProducts = this.products.filter(product =>
      (this.searchTerm.trim() === '' || product.name.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (this.minPrice === null || product.price >= this.minPrice) &&
      (this.maxPrice === null || product.price <= this.maxPrice)
    );
  }


}
