// Realizaremos una importacion de los componentes que utilizaremos de mongoose
// En este caso el recurso "Schema", y el recurso "Model"

import {Schema, model } from 'mongoose'

export class Aparato {
     _nombre: string
     _cant: number
     _carga: number
     _uso: number

    constructor(nombre:string,cant:number,carga:number,uso:number){
        this._nombre=nombre
        this._cant=cant
        this._carga=carga
        this._uso=uso
    }
}


// A continuación definiremo el type

export type tAparato= {
    _nombre: string,
    _cant: number,
    _carga: number,
    _uso: number
}




// A continuación defineremos el esquema 


export const aparatoSchema = new Schema ({
    _nombre: {
        type: String,
        required:true,
        maxlength:30,
    },
    _cant:{
        type: Number,
        required:true,
        min: 1
    },
    _carga:{
        type: Number,
        required:true,
        min:1
    },
    _uso:{
        type: Number,
        required:true,
        min:0.30,
        max:24
    },
})

