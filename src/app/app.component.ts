import { Component, OnInit } from '@angular/core';
import {Store } from '@ngrx/store'
import {Observable } from 'rxjs'

import {ShoppingItem} from './store/models/shopping-item.model'
import {AppState} from './store/models/app-state.model'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ShoppingReducer } from './store/reducers/shopping.reducer';
import { AddItemAction, DeleteItemAction, LoadShoppingAction } from './store/actions/shoping.actions';
import {v4 as uuid } from 'uuid'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  newShoppingItem : ShoppingItem = { id:'', name : ''}
  shoppingItems! : Observable<Array<ShoppingItem>>
  loading$:Observable<Boolean>;
  error$: Observable<Error>
  constructor(private store : Store<AppState>){

   // this.shoppingItems =  Observable<Array<ShoppingItem>>


  }

  ngOnInit(){

  this.loading$ = this.store.select(store => store.shopping.loading)
  this.newShoppingItem.id = uuid();
  this.shoppingItems =   this.store.select(store => store.shopping.list)
  this.error$ = this.store.select(store => store.shopping.error)
 // setTimeout(() => this.addItem(), 2000);


    this.store.dispatch(new LoadShoppingAction())
  }


  addItem()
  {

    this.store.dispatch(new AddItemAction(this.newShoppingItem))

    this.newShoppingItem = {id: '', name : ''}
  }

  deleteItem(id : string)
  {

    this.store.dispatch(new DeleteItemAction(id))

  }

}
