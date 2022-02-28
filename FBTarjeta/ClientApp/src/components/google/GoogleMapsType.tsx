import {Polygon, IProvidedProps,mapEventHandler,markerEventHandler,Map, InfoWindow, Marker, GoogleApiWrapper,IMapProps,} from 'google-maps-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store';
import CSS from 'csstype';

import * as MarkerStore from '../../store/google/GoogleMaps';
import { Coordenada} from '../../store/google/GoogleMaps';
type MarkerProps =
MarkerStore.MarkerGoogleState &
    typeof MarkerStore.actionCreators &
    RouteComponentProps<{}>;
//IMapProps

/* function Marcaciones(props:any) {
    const tamanio = props.markers.length;
    if (tamanio > 0) {
      return  {props.markers.map((forecast: any) =>
        <Marker 
            position={{
                lat: forecast.lat,
                lng: forecast.lng
            }} />
        )} ;
    }
    return <div />;
} */

export class MapContainer extends React.Component<IMapProps, { markers: Coordenada[] }> {
    //onMapClicked: mapEventHandler;
    onMarkerClick: any//markerEventHandler;
    
    onInfoWindowClose: any;
    //map?: google.maps.Map | google.maps.StreetViewPanorama
    constructor(props:any){
        super(props);
        this.onMapa = this.onMapa.bind(this);
        this.btnLimpiar = this.btnLimpiar.bind(this);
        //this.onMarkerClick = this.onMarkerClick.bind(this);
        //this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    }
    public state = {
        markers: []
    };
    btnLimpiar(){
        this.setState({markers: []});
    }
    onMapa(ref:any, map:any, ev:any){
        const latLng = ev.latLng;
        //console.log(e);
        const latitude = latLng.lat(); 
        const longitude = latLng.lng(); 
        console.log(latitude + ", " + longitude);  
        var coord:Coordenada; 
        coord = {
            lat: latitude,
            lng: longitude,
        }
        let markers:any = []

        for(var x in this.state.markers){
            markers.push(this.state.markers[x]); 
        }
        markers.push({
            lat: coord.lat,
            lng: coord.lng,
        }); 
        this.setState({markers: markers});
    }
    componentDidMount() {
        
    }
    public render() {
        //GoogleMaps.tsx:22 37.77484758908875, -122.44252162500497
        /* let makers = [{
            lat: 37.77484758908875,
            lng: -122.44252162500497
          },{
            lat: 37.78155013787093, 
            lng: -122.47137790613787
          },{
            lat: 37.77985420629088, 
            lng: -122.49541049891131
          }]
 *///
            const style: CSS.Properties = {
                height:"200px"
            };
            return (
                <div style={style}>
                    <button 
                        onClick={this.btnLimpiar}
                        className="btn btn-warning btn.lg">
                        Limpiar
                    </button>
                    <Map 
                        
                        onClick={this.onMapa}
                        google={this.props.google} 
                        initialCenter={{
                            lat: 37.77484758908875,
                            lng: -122.44252162500497
                        }}
                        zoom={14}>
                            {this.state.markers.map((forecast: any) =>
                            <Marker 
                                position={{
                                    lat: forecast.lat,
                                    lng: forecast.lng
                                }} />
                            )} 
                        <Polygon 
                                paths={this.state.markers} />  
                    </Map>
                </div>
        );
    }
}
 
export  default GoogleApiWrapper({
  apiKey: 'AIzaSyDZktO_JnnvrY4BnD2IyZo8PqNXiDTWP1w'
})(MapContainer)

