// Realizaremos una importacion de los componentes que utilizaremos de mongoose
// En este caso el recurso "Schema", y el recurso "Model"

import mongoose from 'mongoose';

class DataBaseConec {
    private _conexion: string = 'mongodb+srv://prueba:123@cluster0.riz7l.mongodb.net/<dbname>?retryWrites=true&w=majority'
    constructor(){}

    set conexion(_conexion:string){
        this._conexion= _conexion 
    }

// Crearemos una función de tipo asincrona para conectarnos a la base de datos

    conectarBD = async () => {
        const promise = new Promise<string> (async (resolve, reject) =>{
            await mongoose.connect(this._conexion, {
                useNewUrlParser: true,
                useUnifiedTopology:true,
                useCreateIndex: true, // Crearemos un indice, con esto podremos la restriccion unique
                useFindAndModify:false // Habilita el uso de findOneAndDelete y findAndModify
            })
            .then( () => resolve(`Conexion completa a ${this._conexion}`))
            .catch( (error) => reject(`No se ha podido conectar a ${this._conexion}: ${error}`))
        })
            return promise
    }


// Crearemos una función de tipo asincrona para conectarnos a la base de datos

    desconectarBD= async() => {
        const promise = new Promise<string>(async (resolve,reject)=> {
            await mongoose.disconnect()
            .then( () => resolve(`Desconectado de ${this._conexion}`))
            .catch( (error) => reject(`Desconexion fallida de ${this._conexion}: ${error}`))
        })
        return promise
    }
}

export const DB = new DataBaseConec()