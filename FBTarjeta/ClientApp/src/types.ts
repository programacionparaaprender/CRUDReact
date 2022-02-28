
export interface IBoard{
    squares: Array<string>
}  

export interface Vieja {
    history: Array<IBoard>,
    stepNumber: number,
    xIsNext: boolean,
}


export interface Producto{
    id: string;
    name: string;
    description:string
    price: string;
}

export class ProductoClass{
    id: string;
    name: string;
    description:string
    price: string;
    constructor(){
        this.id = "2";
        this.name = "Nombre1";
        this.description="Descripcion1";
        this.price="20.0";
    } 
}