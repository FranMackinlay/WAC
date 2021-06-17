import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { trigger, transition, style, animate, state } from '@angular/animations';
import { ProductsSrv } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product.interface';
import { HttpProductResponse } from 'src/app/interfaces/http-product-response.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  animations: [
    trigger('widthGrow', [
      state('closed', style({
        width: 0,
        opacity: 0,
      })),
      state('open', style({
        opacity: 1,
      })),
      transition('* => *', animate(150))
    ]),
  ]
})
export class DashboardComponent implements OnInit {

  state!: string;
  displayedColumns: string[] = [];
  dataSource!: Product[];
  selectedProduct!: Product;
  productForm!: FormGroup;



  constructor(private fb: FormBuilder, private productService: ProductsSrv, private cdr: ChangeDetectorRef, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (!window.history.state.data?.token) this.route.navigate(['/login']);
    this.state = 'closed';
    this.displayedColumns = ['name', 'status', 'edit'];
    this.productService.getProducts().subscribe((response: any) => {
      this.dataSource = response.products;
    });
  }


  onClickEdit(element: any) {
    if (this.selectedProduct && element.id !== this.selectedProduct.id) this.changeState();
    this.selectedProduct = element;
    this.hydrateForm(this.selectedProduct)
    this.changeState();
  }

  hydrateForm(product: Product) {
    this.productForm = this.fb.group({
      id: [product.id, [Validators.required]],
      name: [product.name, [Validators.required, Validators.minLength(3)]],
      status: [product.status, [Validators.required, Validators.minLength(6)]],
      color: [product.color, [Validators.required, Validators.minLength(3)]],
      description: [product.description, [Validators.required, Validators.minLength(5)]],
      created_at: [product.created_at, [Validators.required, Validators.minLength(3)]],
      updated_at: [product.updated_at, [Validators.required, Validators.minLength(3)]],
    })
  }

  changeState(): void {
    (this.state == "closed") ? this.state = "open" : this.state = "closed";
  }

  onSubmit(): void {
    if (!this.productForm.valid) {
      return alert('Please check the form again.');
    }

    this.productService.updateProduct(this.productForm.value).subscribe((data: HttpProductResponse) => {
      this.dataSource = data.products;
      this.changeState();
    });
  }

}
