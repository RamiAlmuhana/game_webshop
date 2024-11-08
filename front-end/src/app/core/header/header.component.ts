import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import {CartService} from "../../services/cart.service";
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  public showHotCupIcon: boolean = false;
  public userIsLoggedIn: boolean = false;

  public amountOfProducts: number = 0;
  public isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router, private cartService: CartService){}

  public ngOnInit(): void {
    this.checkLoginState();
    this.checkIsAdmin();
    this.cartService.$productInCart.subscribe((products: Product[]) => {
      this.amountOfProducts = products.length;
    })
  }

  public onLogout(): void{
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  public checkLoginState(): void{

    this.authService
      .$userIsLoggedIn
      .subscribe((loginState: boolean) => {
        this.userIsLoggedIn = loginState;
      });
  }

  public checkIsAdmin(): void {
    this.authService
      .$userIsAdmin
      .subscribe((isAdmin: boolean) => {
        this.isAdmin = isAdmin;
      });
  }


}
