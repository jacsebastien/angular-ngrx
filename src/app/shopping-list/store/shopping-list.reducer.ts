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
        ingredients: state.ingredients.map((ig, index) => index === state.editedIngredientIndex ? { ...ig, ...action.payload } : ig),
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case Actions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, index) => index !== state.editedIngredientIndex),
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case Actions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] }
      };
    case Actions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}
