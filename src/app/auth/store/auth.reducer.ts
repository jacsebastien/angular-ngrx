import { User } from '../user.model';
import * as Actions from './auth.actions';

export interface State {
    user: User;
}

const initialState: State = {
    user: null
};

export function authReducer(state = initialState, action: Actions.AuthActions) {
    switch (action.type) {
        case Actions.LOGIN:
            const newUser = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
            );
            return {
                ...state,
                user: newUser
            };
        case Actions.LOGOUT:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}
