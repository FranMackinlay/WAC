import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { trigger, transition, style, animate, state } from '@angular/animations';
import { ProductsSrv } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product.interface';
import { Router } from '@angular/router';
import { HttpProductResponse } from 'src/app/interfaces/http-product-response.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  animations: [
    trigger('widthGrow', [
      state('closed', style({
        width: 0,
        opacity: 0,
        position: 'absolute',
        right: '-20em'
      })),
      state('open', style({
        opacity: 1,
        position: 'unset',
      })),
      transition('* => *', animate(150))
    ]),
  ]
})
export class DashboardComponent implements OnInit {


  state!: string;
  selectedProduct!: Product;
  products!: Product[];

  constructor(private productService: ProductsSrv, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // if (!window.history.state.data?.token || !user.token) this.route.navigate(['/login']);
    this.state = 'closed';
  }

  onChangeSelectedProduct($event: Product) {
    if (this.selectedProduct && this.selectedProduct.id !== $event.id) this.changeState();
    this.selectedProduct = $event;
    this.changeState();

  }

  changeState(): void {
    (this.state == "closed") ? this.state = "open" : this.state = "closed";
  }


  onSaveChanges($event: any) {
    this.productService.updateProduct($event).subscribe((data: HttpProductResponse) => {
      this.products = data.products;
      this.changeState();
    });
  }

}
