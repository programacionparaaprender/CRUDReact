import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';

//import * as CounterStore from '../store/Counter';
import * as ProductStore from '../store/TarjetaCredito';
import {Producto} from '../types'
import { TarjetaCredito } from '../models/tarjetacredito'

type ProductProps =
ProductStore.WeatherTarjetaState &
    typeof ProductStore.actionCreators &
    RouteComponentProps<{}>;


//Producto colocarlo en el extends para que funcione todo
class Product extends React.PureComponent<ProductProps, TarjetaCredito> {

    constructor(props: any) {
        super(props);
        
        this.state = {
            id:1,
            titular: "Carlos Marcano",
            numeroTarjeta: "2626262626262626",
            fechaExpiracion: "12/24",
            cvv:  "231"
        }
        this.props.obtenerTarjetas();
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleChange5 = this.handleChange5.bind(this);
        this.añadirProducto = this.añadirProducto.bind(this);
        this.editarProducto = this.editarProducto.bind(this);
    } 
    añadirProducto(){
        var product:TarjetaCredito; 
        product = {
            id: this.state.id,
            titular: this.state.titular,
            numeroTarjeta:this.state.numeroTarjeta,
            fechaExpiracion: this.state.fechaExpiracion,
            cvv: this.state.cvv
        }
        this.props.addToCart2(product);
        this.setState({ id: 0 });
    }

    handleChange2(e:any) {
        /* var obj[e.target.name] = e.target.value
        this.setState(obj); */
        //console.log(e.target.value);
        this.setState({ titular: String(e.target.value) });
        //this.state.id = e.target.value;
    }
    handleChange3(e:any) {
        /* var obj[e.target.name] = e.target.value
        this.setState(obj); */
        //console.log(e.target.value);
        this.setState({ numeroTarjeta: String(e.target.value) });
        //this.state.id = e.target.value;
    }
    handleChange4(e:any) {
        /* var obj[e.target.name] = e.target.value
        this.setState(obj); */
        //console.log(e.target.value);
        this.setState({ fechaExpiracion: String(e.target.value) });
        //this.state.id = e.target.value;
    }
    handleChange5(e:any) {
        /* var obj[e.target.name] = e.target.value
        this.setState(obj); */
        //console.log(e.target.value);
        this.setState({ cvv: String(e.target.cvv) });
        //this.state.id = e.target.value;
    }
    editarProducto(forecast:any){
        this.setState({
            id:forecast.id,
            titular: forecast.titular,
            numeroTarjeta: forecast.numeroTarjeta,
            fechaExpiracion: forecast.fechaExpiracion,
            cvv:  forecast.cvv
        });
    }
    public render() {
        const dynamicLength = 16;
        const tamanioCVV = 3;
        const tamanioFecha = 5;
        return (
            <React.Fragment>
                <h1>
                    Ejemplo de tarjetas de credito
                </h1>
                <form>
                    <div className="form-group">
                        <label>Títular:</label>
                        <input 
                            onChange={this.handleChange2}
                            value={this.state.titular} 
                            title="Ingrese títular"
                            type="text" 
                            id="Inombre" 
                            name="titular" 
                            placeholder="Ingrese títular" 
                            className="form-control" />
                    
                    </div>
                    <div className="form-group">
                        <label>Número de tarjeta de credito:</label>
                        <input 
                            onChange={this.handleChange3}
                            value={this.state.numeroTarjeta}
                            title="Número de tarjeta de credito"
                            maxLength={dynamicLength}
                            type="text" 
                            id="Idescripcion" 
                            name="numeroTarjeta" 
                            placeholder="Número de tarjeta de credito" 
                            className="form-control" />
                    
                    </div>
                    <div className="form-group">
                        <label>Fecha de expiración:</label>
                        <input 
                            onChange={this.handleChange4}
                            value={this.state.fechaExpiracion}
                            maxLength={tamanioFecha}
                            title="Fecha de expiración" 
                            type="text" 
                            id="Idescripcion" 
                            name="fechaExpiracion" 
                            placeholder="Fecha de expiración:" 
                            className="form-control" />
                    
                    </div>
                    <div className="form-group">
                        <label>CVV:</label>
                        <input 
                            onChange={this.handleChange4}
                            value={this.state.cvv}
                            maxLength={tamanioCVV}
                            title="cvv" 
                            type="text" 
                            id="Idcvv" 
                            name="cvv" 
                            placeholder="cvv:" 
                            className="form-control" />
                    
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button"
                            className="btn btn-primary btn-lg"
                            onClick={() => { this.añadirProducto(); }}>
                            addToCard
                        </button>
                        <button type="reset"
                            className="btn btn-warning btn-lg">
                            Reset
                        </button>
                        <button type="button"
                            className="btn btn-danger btn-lg">
                            Salir
                        </button>
                    </div>
                </form>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Titular</th>
                    <th>Número de tarjeta</th>
                    <th>Fecha de expiración</th>
                    <th>CVV</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {this.props.tarjetas.map((forecast: TarjetaCredito) =>
                    <tr key={forecast.id}>
                        <td>{forecast.id}</td>
                        <td>{forecast.titular}</td>
                        <td>{forecast.numeroTarjeta}</td>
                        <td>{forecast.fechaExpiracion}</td>
                        <td>{forecast.cvv}</td>
                         <td>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button 
                                    onClick={() => { this.editarProducto(forecast) }}
                                    type="button"
                                    className="btn btn-success">
                                    Editar
                                </button>
                                <button type="button"
                                    onClick={() => { this.props.deleteProduct2(String(forecast.id)); }}
                                    className="btn btn-danger">
                                    Eliminar
                                </button>
                            </div>
                        </td>
                    </tr>
                )} 
                {/* {<p aria-live="polite">Current products: <strong>{JSON.stringify(this.props.products)}</strong></p> } */}
                </tbody>
                </table>
            </React.Fragment>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.tarjetas,
    ProductStore.actionCreators
)(Product as any);
