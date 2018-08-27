import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Observable }from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { delay, share } from 'rxjs/operators';

import { Item,
  ItemService }     from './items.service';
// *ngIf="item" or item?.name is  needed for it to work!!
//    {{(itemO|async )?.name }} |? will display the value
@Component({
  template: `
    <h3 highlight>Item Detail</h3>
    <div>Item id: {{id}}</div>
    <br>
    <div>Item name: {{name}}</div>
    <br>
    <div *ngIf="item">Item.name: {{item.name}}</div>
    <div>Item.name: {{item?.name}}</div>
    <br>
    <div *ngIf="itemObservable">itemObservable.name:
     {{(itemObservable|async )?.name }}
    </div>
    <div>User.name: {{user?.lastName}}</div>
    <br>
    <div>userObservable.name: {{(userObservable | async )?.lastName}}</div>
    <br>
    new ngIf syntax: userObservable
    <div *ngIf="userObservable | async; let userObservable; else loading">
     {{userObservable.lastName}}
     </div>
    <a routerLink="../list">Items List</a>
  `
})
export class ItemsDetailComponent implements OnInit {
  id: number;
  name: string;
  itemObservable: Observable<Item>;
  item: Item;
  user: {};
  userObservable: Observable<{}>;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private itemService: ItemService) {
    this.itemObservable = this.itemService.getItem(1);
    this.userObservable = this.itemService.getAsyncData().pipe(share());
  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.itemService.getItem(this.id).subscribe(item => {
      this.name = item.name;
      this.item = item;
      this.subscription = this.itemService.getAsyncData().subscribe(u => this.user = u);
    });
  }

  ngOnDestroy() {
    // Only need to unsubscribe if its a multi event Observable
    this.subscription.unsubscribe();
  }

}
