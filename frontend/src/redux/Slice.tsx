import {combineReducers, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TransactionObject} from '../utilities/constants';

interface transactionsData {
  data: TransactionObject[] | undefined;
}

const defaultState: transactionsData = {
  data: undefined,
};

export const transactionSlice = createSlice({
  name: 'transactionData',
  initialState: defaultState,
  reducers: {
    /**
     *  Adds new transaction to the list
     * @param action - PayloadAction<TransactionObject> - transaction object
     */
    add: (state, action: PayloadAction<TransactionObject>) => {
      if (state.data) {
        state.data.push(action.payload);
      } else {
        const data = [action.payload];
        state.data = data;
      }
    },

    /**
     * Removes the transaction from the list by looking through the list -> If it doesn't find it, does nothing
     *  */ 
    remove: (state, action: PayloadAction<TransactionObject>) => {
      if (state.data) {
        // remove the transaction from the array
        for (let i = 0; i < state.data.length; i++) {
          if (state.data[i] === action.payload) {
            state.data.splice(i, 1);
          }
        }
      }
    },
  },
});

export const rootReducer = combineReducers({
  data: transactionSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const {add, remove} = transactionSlice.actions;
export default transactionSlice.reducer;
