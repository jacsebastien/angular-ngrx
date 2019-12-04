import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from '../logging.service';

import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: [ './shopping-list.component.css' ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredientsObs: Observable<{ ingredients: Ingredient[] }>;
    // ingredients: Ingredient[];
    // private subscription: Subscription;

    constructor(
        private loggingService: LoggingService,
        private store: Store<fromShoppingList.AppState>
    ) {}

    ngOnInit() {
        // Ingredients is now an observable, updated automatically by the store depending on the action
        this.ingredientsObs = this.store.select('shoppingList');

        // this.ingredients = this.slService.getIngredients();
        // this.subscription = this.slService.ingredientsChanged.subscribe(
        //   (ingredients: Ingredient[]) => {
        //     this.ingredients = ingredients;
        //   }
        // );

        this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
    }

    onEditItem(index: number) {
        // this.slService.startedEditing.next(index);
        this.store.dispatch(new ShoppingListActions.StartEdit(index));
    }

    ngOnDestroy() {
        // this.subscription.unsubscribe();
    }
}
