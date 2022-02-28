//import { Action, Reducer } from 'redux';
import axios from 'axios';
import { Reducer } from 'redux';
import { TarjetaCredito } from '../models/tarjetacredito'

import { AppThunkAction } from './';


export interface WeatherTarjetaState{
    //products:Array<Producto>
    tarjetas:TarjetaCredito[]
}  
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface RequestObtenerTarjetaAction {
    type: 'REQUEST_WEATHER_FORECASTS',
    tarjetas:TarjetaCredito[]
}
interface AnadirTarjetaCreditoAction {
    type: 'ADD_TO_CART2',
    tarjetas:TarjetaCredito[]
}


export interface IncrementCountAction { type: 'INCREMENT_COUNT' }
export interface DecrementCountAction { type: 'DECREMENT_COUNT' }
export interface ADD_TO_CART { 
    type: 'ADD_TO_CART',
    payload:{
        id: number;
        titular: string;
        numeroTarjeta: string;
        fechaExpiracion: string;
        cvv: string;
    }
}
export interface DELETE_PRODUCT { 
    type: 'DELETE_PRODUCT',
    id: string;
}
// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = AnadirTarjetaCreditoAction | RequestObtenerTarjetaAction |IncrementCountAction | DecrementCountAction | ADD_TO_CART | DELETE_PRODUCT;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    increment: () => ({ payload:'data',type: 'INCREMENT_COUNT' } as IncrementCountAction),
    decrement: () => ({ type: 'DECREMENT_COUNT' } as DecrementCountAction),
    addToCart: (product:TarjetaCredito) => ({ payload:product,type: 'ADD_TO_CART' } as ADD_TO_CART),  
    deleteProduct: (id: string) => ({ id: id, type: 'DELETE_PRODUCT' } as DELETE_PRODUCT),
    deleteProduct2: (id: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        axios.delete('api/tarjeta/' + id).then(response => {
            axios.get('api/tarjeta').then(response => {
                // do something with response
                console.log(response);
                dispatch({ type: 'ADD_TO_CART2', tarjetas: response.data });
            }).catch(error => { console.log(error) });
            dispatch({ type: 'ADD_TO_CART2', tarjetas: [] });
        }).catch(error => { console.log(error) });
        dispatch({ type: 'ADD_TO_CART2', tarjetas: [] });
    },
    addToCart2: (product:TarjetaCredito): AppThunkAction<KnownAction> => (dispatch, getState) => {
        if (product.id == 0) {
            axios.post('api/tarjeta', product).then(response => {
                axios.get('api/tarjeta').then(response => {
                    // do something with response
                    console.log(response);
                    dispatch({ type: 'ADD_TO_CART2', tarjetas: response.data });
                }).catch(error => { console.log(error) });
                dispatch({ type: 'ADD_TO_CART2', tarjetas: [] });
            }).catch(error => { console.log(error) });
            dispatch({ type: 'ADD_TO_CART2', tarjetas: [] });
        } else {
            axios.put('api/tarjeta/'+String(product.id), product).then(response => {
                axios.get('api/tarjeta').then(response => {
                    // do something with response
                    console.log(response);
                    dispatch({ type: 'ADD_TO_CART2', tarjetas: response.data });
                }).catch(error => { console.log(error) });
                dispatch({ type: 'ADD_TO_CART2', tarjetas: [] });
            }).catch(error => { console.log(error) });
            dispatch({ type: 'ADD_TO_CART2', tarjetas: [] });
        }
    },
    obtenerTarjetas: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.tarjetas) {
            axios.get('api/tarjeta').then(response => {
                // do something with response
                console.log(response);
                dispatch({ type: 'REQUEST_WEATHER_FORECASTS', tarjetas: response.data });
            });
            dispatch({ type: 'REQUEST_WEATHER_FORECASTS', tarjetas: [] });
        }
    }

};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.



export const reducer: Reducer<WeatherTarjetaState> = (state: WeatherTarjetaState | undefined, incomingAction: KnownAction): WeatherTarjetaState => {
      
    if (state === undefined) {
        
        let tarjetas = [
            {
                id:1,
                titular: "Carlos Marcano",
                numeroTarjeta: "2626262626262626",
                fechaExpiracion: "12/24",
                cvv:  "231"
            },
            {
                id:2,
                titular: "Maria Gonzales",
                numeroTarjeta: "2727272727272727",
                fechaExpiracion: "12/23",
                cvv:  "233"
            }
        ]
        
        //console.log(JSON.stringify(tarjetas))
        return { tarjetas: tarjetas };
    }
    //console.log('incomingAction: '+JSON.stringify(incomingAction))
    var action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_WEATHER_FORECASTS':
            return {
                    tarjetas: action.tarjetas
            }
           
            break;
        case 'ADD_TO_CART2':
            return {
                    tarjetas: action.tarjetas
            }
            
            break;
        case 'DELETE_PRODUCT':
            action = incomingAction as DELETE_PRODUCT;
            //let products:Array<Producto>
            let products2 = []
            for(var y in state.tarjetas){
                if(String(state.tarjetas[y].id) !== String(action.id))
                    products2.push(state.tarjetas[y]);
            } 
            return  { tarjetas: products2 };
            

        case 'ADD_TO_CART':
            action = incomingAction as ADD_TO_CART;
            //let products:Array<Producto>
            let tarjetas = []
            for(var x in state.tarjetas){
                tarjetas.push(state.tarjetas[x]);
            }
            tarjetas.push({
                id: action.payload.id,
                titular: action.payload.titular,
                numeroTarjeta:action.payload.numeroTarjeta,
                fechaExpiracion: action.payload.fechaExpiracion,
                cvv: action.payload.cvv
            }); 
            return  { tarjetas: tarjetas };
            
        default:
            return state;
    }
};
