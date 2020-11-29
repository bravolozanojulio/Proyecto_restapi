import {Request, Response, Router } from 'express'
import { DB } from '../database/mongoatlas'

class identificacionRoutes {
    private _ruta: Router

    constructor() {
        this._ruta = Router()
    }
    get router(){
        return this._ruta
    }

    private getId = async (req: Request, res: Response) =>{
        await DB.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            res.send(mensaje)
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })
        DB.desconectarBD()
    }

    Rutas(){
        this._ruta.get('/', this.getId)
    }
}

const obj = new identificacionRoutes()
obj.Rutas()
export const identificacionRoutes1 = obj.router