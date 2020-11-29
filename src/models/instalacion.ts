// Realizaremos una importacion de los componentes que utilizaremos de mongoose
// En este caso el recurso "Schema", y el recurso "Model"

import {Schema,model} from 'mongoose'

import {Aparato, aparatoSchema} from './aparato'


export class Instalacion{
    private _ident:string
    private _fecha:Date
    private _garantia:boolean
    private _direc:string
    private _tec: Array<string>
    private _aparatos: Array<Aparato>
    private "_sold": number
    private "_asolar":number
    private "_autonomia":number
    private "_evendedor":number



    constructor(ident:string, fecha: Date, garantia:boolean, direc: string, tec: Array<string>, aparatos: Array<Aparato>) {
        this._ident= ident
        this._fecha= fecha
        this._garantia= garantia
        this._direc= direc
        this._tec= tec
        this._aparatos= aparatos
    }

// Definiremos los metodos tipo Get y set para cada elemento

get ident(){
    return this._ident
}

set ident(ident:string){
    this._ident=ident
}

get fecha(){
    return this._fecha
}

set fecha(fecha:Date){
    this._fecha=fecha
}

get garantia(){
    return this._garantia
}

set garantia(garantia:boolean){
    this._garantia=garantia
}


get direc(){
    return this._direc
}

set direc(direc:string){
    this._direc=direc
}


get tec(){
    return this._tec
}

set tec(tec:Array<string>){
    this._tec=tec
}


get aparatos(){
    return this._aparatos
}

set aparatos(aparatos:Array<Aparato>){
    this._aparatos=aparatos
}

get sold(){
    return this._sold
}

set sold (sold:number) {
    this._sold=sold
}


get asolar (){
    return this._asolar
}

set asolar(asolar:number){
    this._asolar=asolar
}


get autonomia (){
    return this._autonomia
}

set autonomia(autonomia:number){
    this._autonomia=autonomia
}



get evendedor (){
    return this._evendedor
}

set evendedor(evendedor:number){
    this._evendedor=evendedor
}


// Definiremos los calculos 

calculo1(){
    let cdc=0
    
    for (let a of this._aparatos){
       cdc= cdc + a._carga * a._cant * a._uso / 12
    }

    let asistema= cdc * 1.2 / this.sold
    let resultado= Math.ceil(asistema/this.asolar)
    
    console.log(`\n Son necesarias ${resultado} placas para esta instalación`)
}


calculo2(){

    let cnb=0

    for (let b of this._aparatos){
    cnb= cnb + b._carga * b._cant * b._uso * this.autonomia
    }

    let ccb= cnb/0.8
    let resultado= Math.ceil(ccb /this.evendedor)

    console.log(`\n Son necesarias ${resultado} baterias para esta instalación`)

}


// A continuación definiremo el type
}



export type tInstalacion = {
    _ident: String,
    _fecha: Date,
    _garantia: boolean,
    _direc: String,
    _tec: Array<String>
    _aparatos: Array <Aparato>
}


// A continuación defineremos el esquema 


function arraymax(_tec:Array<string>) {
    return _tec.length <= 2 
  }


function vacio(_tec:Array<string>) {

    if (_tec[0] !="") {
        return _tec[1]!= "" 
    } else {
        return _tec[0] != "" 
    }
   
  }


var arrayval = [
    { validator: arraymax, msg: 'Máximo 2 trabajadores' },
    { validator: vacio, msg: 'Un trabajador no tiene nombre' }
];



const instalacionSchema = new Schema ({
    _tec: {
        type: [String],
        required:true,
        validate:arrayval,
    },
    _ident: {
        type: String,
        required:true,
        unique:true // Deberemos crear un indice en nuestra conexion a la base de datis
    },
    _fecha:{
        type: Date,
        required:true
    },
    _garantia:{
        type: Boolean,
        required:true,
    },
    _direc:{
        type: String,
        required:true,
    },
    _aparatos:{
        type:[aparatoSchema],
        required:true,
    },
})



// Exportaremos la coleccion Aparatos de la BD

// Se indicara el nombre de la clase en plurar en nuestro caso instalacion

export const Instalaciones = model('Instalaciones', instalacionSchema)