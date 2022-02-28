import { Reducer } from 'redux';
import {Vieja,IBoard} from '../types'

export interface ViejaState {
    vieja: Vieja
}

export interface IncrementCountAction { type: 'INCREMENT_COUNT' }
export interface DecrementCountAction { type: 'DECREMENT_COUNT' }
export interface ADD_TO_CART { 
    type: 'ADD_TO_CART',
    payload:{
        id: string;
        name: string;
        description:string
        price: string;
    }
}
export interface DELETE_PRODUCT { 
    type: 'DELETE_PRODUCT',
    id: string;
}
// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = IncrementCountAction | DecrementCountAction | ADD_TO_CART | DELETE_PRODUCT;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    increment: () => ({ payload:'data',type: 'INCREMENT_COUNT' } as IncrementCountAction),
    decrement: () => ({ type: 'DECREMENT_COUNT' } as DecrementCountAction),
    deleteProduct: (id:string) => ({ id:id,type: 'DELETE_PRODUCT' } as DELETE_PRODUCT)  

};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<ViejaState> = (state: ViejaState | undefined, incomingAction: KnownAction): ViejaState => {
    if (state === undefined) {
        let vieja = {
            history: [{
              squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
          };
        return { vieja: vieja }
    }
    //console.log('incomingAction: '+JSON.stringify(incomingAction))
    var action = incomingAction as KnownAction;
    switch (action.type) {

       
        default:
            return state;
    }
};
