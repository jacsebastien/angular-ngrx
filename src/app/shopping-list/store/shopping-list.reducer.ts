import { Ingredient } from '../../shared/ingredient.model';
import * as Actions from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function shoppingListReducer(
  state = initialState,
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
