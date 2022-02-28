import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import * as Product from './Product';
import * as Vieja from './Vieja';
import * as GoogleMaps from './google/GoogleMaps';
//import { ProductState }  from '../types.ts'
// The top-level state object
import * as TarjetaCredito from './TarjetaCredito';

export interface ApplicationState {
    counter: Counter.CounterState | undefined;
    products: Product.ProductState | undefined;
    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
    vieja: Vieja.ViejaState | undefined;
    markers: GoogleMaps.MarkerState | undefined;
    tarjetas: TarjetaCredito.WeatherTarjetaState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    products: Product.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    vieja: Vieja.reducer,
    googlemaps: GoogleMaps.reducer,
    tarjetas: TarjetaCredito.reducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
