import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsSrv } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.less']
})
export class ProductsTableComponent implements OnInit {

  @Input() products!: Product[];
  @Output() selectedProductChange = new EventEmitter<Product>();

  dataSource!: Product[];
  selectedProduct!: Product;
  displayedColumns: string[] = [];

  constructor(private productService: ProductsSrv) {
  }

  ngOnInit(): void {
    this.displayedColumns = ['name', 'status', 'edit'];
    this.productService.getProducts().subscribe((response: any) => {
      this.dataSource = response.products;
    });
  }



  ngOnChanges(products: SimpleChanges) {
    this.dataSource = products.products.currentValue;
  }

  onClickEdit(element: any) {
    this.selectedProduct = element;
    this.selectedProductChange.emit(this.selectedProduct);
  }


}
