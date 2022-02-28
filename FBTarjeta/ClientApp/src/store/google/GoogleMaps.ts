import { Reducer } from 'redux';
import {GoogleAPI} from 'google-maps-react';


export interface Coordenada{
    lat: number,
    lng: number
}

export interface MarkerGoogleState{
    markers:Coordenada[]
    google: GoogleAPI
    loaded?: boolean
} 

export interface MarkerState{
    markers:Coordenada[]
    
}  

export interface ADD_TO_COORDENADA { 
    type: 'ADD_TO_COORDENADA',
    payload:{
        lat: number,
        lng: number
    }
}
export interface DELETE_COORDENADA { 
    type: 'DELETE_COORDENADA'
}

export type KnownAction = ADD_TO_COORDENADA | DELETE_COORDENADA;

export const actionCreators = {

    addToCoordenada: (marker:Coordenada) => ({ payload:marker, type: 'ADD_TO_COORDENADA' } as ADD_TO_COORDENADA),  
    deleteProduct: () => ({ type: 'DELETE_COORDENADA' } as DELETE_COORDENADA)  

};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<MarkerState> = (state: MarkerState | undefined, incomingAction: KnownAction): MarkerState => {
    if (state === undefined) {
        let markers:any = []
        /* let markers = [{
            lat: 37.77484758908875,
            lng: -122.44252162500497
          },{
            lat: 37.78155013787093, 
            lng: -122.47137790613787
          },{
            lat: 37.77985420629088, 
            lng: -122.49541049891131
          }] */
        return { markers: markers };
    }
    //console.log('incomingAction: '+JSON.stringify(incomingAction))
    var action = incomingAction as KnownAction;
    switch (action.type) {
        case 'DELETE_COORDENADA':
            action = incomingAction as DELETE_COORDENADA;
            let markers2:Coordenada[]
            markers2 = []
            return  { markers: markers2 };
            

        case 'ADD_TO_COORDENADA':
            action = incomingAction as ADD_TO_COORDENADA;
            //let products:Array<Producto>
            let markers:any = []
            for(var x in state.markers){
                markers.push(state.markers[x]);
            }
            markers.push({
                lat: action.payload.lat,
                lng: action.payload.lng,
            }); 
            
            return  { markers: markers };
            
        default:
            return state;
    }
};
