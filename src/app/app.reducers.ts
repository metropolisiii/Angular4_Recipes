import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/aith.reducers';

export interface AppState{
    shoppingList: fromShoppingList.State,
    auth: fromAuth.State    
}
