import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from "../../services/comment.service";
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

// Importeer het Comment-model met een andere naam om het conflict op te lossen
import { Comment as FrontendComment } from '../../models/comment.model';
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public product!: Product;
  private productId: number;
  public comments: FrontendComment[] = []; // Gebruik het geïmporteerde Comment-model

  // Definieer newComment als een leeg Comment-object
  public newComment: { productId: number; name: string; comment: string } = { productId: 0, name: '', comment: '' };

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService,
    private commentService: CommentService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
      this.loadComments();
    });

    this.productsService.getProductByIndex(this.productId)
      .subscribe((product: Product) => {
        this.product = product;
      });
  }

  public onBuyProduct(product: Product) {
    this.cartService.addProductToCart(product);
  }

  loadComments() {
    this.commentService.getComments(this.productId)
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  // onSubmit() {
  //   // Controleer of de invoervelden niet leeg zijn voordat je een opmerking toevoegt
  //   if (this.newComment.name.trim() === '' || this.newComment.comment.trim() === '') {
  //     this.snackbarService.openSnackBar('Velden mogen niet leeg zijn!');
  //     return;
  //   }
  //
  //   this.newComment.productId = this.productId;
  //   // Verzend het newComment-object naar de backend
  //   this.commentService.addComment(this.newComment)
  //     .subscribe(() => {
  //       this.loadComments(); // Herlaad de opmerkingen na toevoeging
  //       // Reset het nieuwe opmerkingenveld
  //       this.newComment = { productId: 0, name: '', comment: '' };
  //     });
  // }


  submitComment() {
    // Retrieve the values from the form
    const name = (document.getElementById('commentName') as HTMLInputElement).value;
    const comment = (document.getElementById('commentContent') as HTMLInputElement).value;

    // Check if name and comment are not empty
    if (name.trim() === '' || comment.trim() === '') {
      this.snackbarService.openSnackBar('Fields cannot be empty!');
      return;
    }

    // Set the productId for the new comment
    this.newComment.productId = this.productId;
    this.newComment.name = name;
    this.newComment.comment = comment;

    // Call the addComment method from your CommentService
    this.commentService.addComment(this.newComment).subscribe((comment: FrontendComment) => {
      // Once the comment is successfully added, reload the comments
      this.loadComments();
    });

    // Clear the form fields after submission
    (document.getElementById('commentName') as HTMLInputElement).value = '';
    (document.getElementById('commentContent') as HTMLInputElement).value = '';
  }


}
