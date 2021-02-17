import {Injectable} from '@angular/core'
import {Actions,createEffect, ofType} from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, mergeMap } from 'rxjs/operators'
import {map} from 'rxjs/operators'
import { ShoppingService } from 'src/app/shopping.service'
import { LoadShoppingAction, LoadShoppingFailureAction, LoadShoppingSuccessAction, ShoppingActionTypes,AddItemAction,DeleteItemAction,AddItemSuccessAction,AddItemFailureAction,DeleteItemSuccessAction,DeleteItemFailureAction } from '../actions/shoping.actions'


@Injectable()
export class ShoppingEffects{


  constructor(private actions$:Actions, private shoppingService : ShoppingService ) {}

  loadShopping$ = createEffect(() => {

      return this.actions$.pipe(

        ofType<LoadShoppingAction>(ShoppingActionTypes.LOAD_SHOPPING),
        mergeMap(

          () => this.shoppingService.getShoppingItems().pipe(

              map(data =>  new LoadShoppingSuccessAction(data)),
              catchError(error => of(new LoadShoppingFailureAction(error)) )


          )
        )

      )

  })

  addShoppingItem$ = createEffect(() => {

    return this.actions$.pipe(

      ofType<AddItemAction>(ShoppingActionTypes.ADD_ITEM),
      mergeMap(
        (data) => this.shoppingService.addShoppingItem(data.payload)
          .pipe(
            map(() => new AddItemSuccessAction(data.payload)),
            catchError(error => of(new AddItemFailureAction(error)))
          )


    )


  )
          }
  )

  deleteShoppingItem$ = createEffect(() =>{


    return this.actions$.pipe(


      ofType<DeleteItemAction>(ShoppingActionTypes.DELETE_ITEM),
      mergeMap(
        (data) => this.shoppingService.deleteShoppingItem(data.payload)
          .pipe(
            map(() => new DeleteItemSuccessAction(data.payload)),
            catchError(error => of(new DeleteItemFailureAction(error)))
          )
      )


    )


  })



}
