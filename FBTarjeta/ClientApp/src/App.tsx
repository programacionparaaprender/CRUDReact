import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import Product from './components/Product';
import FetchData from './components/FetchData';
import Vieja from './components/Vieja';
import GoogleMapsType from './components/google/GoogleMapsType';
import TarjetaCredito from './components/TarjetaCredito';
import './custom.css'
export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/tarjetacredito' component={TarjetaCredito} />
        <Route path='/vieja' component={Vieja} />
        <Route path='/googlemaps' component={GoogleMapsType} />
        <Route path='/counter' component={Counter} />
        <Route path='/product' component={Product} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    </Layout>
);

/* export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/product' component={Product} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    </Layout>
);
 */