import { EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less'],
})
export class ProductDetailsComponent implements OnInit {

  @Input() productToUpdate!: Product;
  @Output() productToUpdateChange = new EventEmitter<Product>();


  productForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.hydrateForm(this.productToUpdate || {});

  }

  ngOnChanges(productToUpdate: SimpleChanges) {
    this.hydrateForm(productToUpdate.productToUpdate.currentValue || {});
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

  onSubmit(): void {
    if (!this.productForm.valid) return alert('Please check the form again.');
    this.productToUpdateChange.emit(this.productForm.value);
  }

}
