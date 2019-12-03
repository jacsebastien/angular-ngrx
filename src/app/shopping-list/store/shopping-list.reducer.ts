import { Ingredient } from '../../shared/ingredient.model';
import * as Actions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: State = initialState,
  action: Actions.ShoppingListActions
) {
  switch (action.type) {
    case Actions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case Actions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case Actions.UPDATE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.map((ig, index) => index === action.payload.index ? { ...ig, ...action.payload.ingredient} : ig)
      };
    case Actions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, index) => index !== action.payload)
      };
    default:
      return state;
  }
}
