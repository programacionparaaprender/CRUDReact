
### Ejemplo de como crear proyecto con google maps
npm install --save google-maps-react
npm install @types/googlemaps --save-dev
https://www.npmjs.com/package/google-maps-react
https://stackoverflow.com/questions/55263520/google-maps-react-adding-markers-with-lat-lng


### ejemplo de integrar stores
https://itnext.io/react-native-why-you-should-be-using-redux-persist-8ad1d68fa48b

npm install redux react-redux redux-persist redux-thunk connected-react-router --save

pendiente corregir error Import in body of module; reorder to top  import/first
https://github.com/jashkenas/coffeescript/issues/4815



### ejemplo google maps para typescript
https://developers.google.com/maps/documentation/javascript/using-typescript
https://www.npmjs.com/package/@types/google-map-react
https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/google-map-react/google-map-react-tests.tsx
https://storksnestblog.wordpress.com/2020/08/16/setting-up-google-maps-with-react-typescript/
npm install --save @types/google-map-react
npm install --save-dev @types/googlemaps

### ejemplo de geocerca teoria
https://developers.google.com/location-context/geofencing/

## props react
https://es.reactjs.org/docs/render-props.html#:~:text=El%20t%C3%A9rmino%20%E2%80%9Crender%20prop%E2%80%9D%20se,su%20propia%20l%C3%B3gica%20de%20representaci%C3%B3n.

## react para programadores vuejs
https://sebastiandedeyne.com/react-for-vue-developers/

corrección en index.d.ts
type mapEventHandler = (mapProps?: IMapProps, map?: google.maps.Map, event?:Function) => any
type markerEventHandler = (props?: IMarkerProps, marker?: google.maps.Marker, event?:Function) => any

corrección en index.d.ts
export class Test<T,S> {
  field1: T;
  field2: S;
}

type Style = Test<string, string | number | boolean>

## Como crear proyecto
dotnet new reactredux -o ReactRedux

dotnet new sln

dotnet add reference .\pro\pro.csproj


npm ls | select-string typescript

npm install -g react-native-cli


redux-persist
https://stackoverflow.com/questions/48514147/rnredux-persist-autorehydrate-is-not-a-function
https://www.npmjs.com/package/redux-persist


// configureStore.js
 
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
import rootReducer from './reducers'
 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 
export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}

//otro archivo

import { PersistGate } from 'redux-persist/integration/react'
 
// ... normal setup, create store and persistor, import components etc.
 
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootComponent />
      </PersistGate>
    </Provider>
  );
};

### Publicar proyecto en github
This section has moved here: https://facebook.github.io/create-react-app/docs/deployment
https://www.youtube.com/watch?v=OUsC13AEiUQ&t=36s

npm install --save gh-pages
package.json
"homepage": "https://programacionparaaprender.github.io/reactrouterts",
  
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",

si ocurre un error
https://stackoverflow.com/questions/63964575/fatal-a-branch-named-gh-pages-already-exists