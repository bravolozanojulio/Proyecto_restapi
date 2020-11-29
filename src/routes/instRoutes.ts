// Realizaremos las importaciones de los modulos, clases, tipo ,etc, que sean necesarias

import {Request, Response, Router } from 'express'
import {Instalaciones, Instalacion, tInstalacion } from '../models/instalacion'
import {DB} from '../database/mongoatlas'


 class instalacionRoutes {
    private _ruta: Router

    constructor() {
        this._ruta = Router()
    }
    get ruta(){
        return this._ruta
    }

   // Primero obtendremos todos las instalaciones almacenadas

    private getInstalaciones = async (req: Request, res: Response) => {

        await DB.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query = await Instalaciones.find()
            console.log(query)
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })
        DB.desconectarBD()
    }
  
// Introduciremos nuevas intatalaciones a través de un cliente post (ej: Postman)

    private nInstPost = async (req: Request, res: Response) => {

        console.log(req.body)
        const {tec, ident, altura, fecha, garantia,direc, aparatos } = req.body

        console.log(ident)

        const iSchema = {
            _tec: tec,
            _ident: ident,
            _fecha: fecha,
            _garantia: Boolean(garantia),
            _direc: direc,
            _aparatos:aparatos
        }

        console.log(iSchema)

        const oSchema = new Instalaciones(iSchema)

        await DB.conectarBD()
        await oSchema.save()


        .then( (doc) => {
            console.log('Salvado Correctamente: '+ doc)
            res.json(doc)
        })
        .catch( (err: any) => {
            console.log('Error: '+ err)
            res.send('Error: '+ err)
        }) 
        // Debido a que estamos usando Mongoatlas gratis es importante que nos desconectamos de la sesion para que otros puedan conectarse

        await DB.desconectarBD()
    }   
     
    
 // Listaremos las placas necesarias para las diferentes instalaciones almacenadas en la base de datos

    private placas = async (req: Request, res: Response) => {
        let i1: Instalacion
        let sup: any = 0

        const {ident} = req.params
        await DB.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            await Instalaciones.find(
                (error, doc: any) => {
                    if(error) {
                        console.log(error)
                        res.json({"error": "mensaje: "+error})
                    }else{
                            console.log('Existe: '+ doc)
                            i1 =  new Instalacion(doc._tec,doc._ident,doc._fecha,doc._garantia,doc._direc,doc._aparatos)  
                            
                            i1.asolar = doc._asolar 
                            i1.sold=doc._sold
                            sup = i1.calculo1()
                            res.json({"id:": ident, "Placas": sup})
                        }
                    }
            )

        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })

        DB.desconectarBD()
    }

    Rutas(){
        this._ruta.get('/listado', this.getInstalaciones)
        this._ruta.get('/', this.placas)
    }
}

const instalacion = new instalacionRoutes()
instalacion.Rutas()
export const instalacion1 = instalacion.ruta 