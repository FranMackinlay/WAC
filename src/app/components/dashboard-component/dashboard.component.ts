import { Component, OnInit } from '@angular/core';
import { Product, Products } from '../../core.contstant';
import { trigger, transition, style, animate, state } from '@angular/animations';


const TABLE_DATA: Product[] = Products;

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

  state: string = 'closed';
  displayedColumns: string[] = ['name', 'status', 'edit'];
  dataSource = TABLE_DATA;

  constructor() { }

  ngOnInit(): void {
  }


  onClickEdit(element: any) {
    console.log(`element`, element);
    this.changeState();
  }

  changeState(): void {
    (this.state == "closed") ? this.state = "open" : this.state = "closed";
  }

}
