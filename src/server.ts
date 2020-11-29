// Realizaremos las importaciones de los modulos, clases, tipo ,etc, que sean necesarias

import express from 'express'
import morgan from 'morgan'


import {instalacion1} from './routes/instRoutes'

import {identificacionRoutes1} from './routes/idRoutes'

class Servidor {
    private app: express.Application
    constructor(){
        this.app = express()
        this.configuracion()
        this.routes()
    }
    private async configuracion(){ // En esta funcion indicaremos los parametros de configuracion de nuestro servidor

        this.app.set('port', process.env.PORT || 3000) // Indicamos el puerto de local host que utilizará nuestro servidor
        this.app.use(express.json()) // Permite al navegador mostrar el formato json
        this.app.use(morgan('dev'))  // Esto mostrara las url introducidas
    }

    private routes(){ // En esta funcion indicaremos el prefijo de las diferentes rutas que vamos a utilizar
        this.app.use('/instalacion', instalacion1)
        this.app.use('/id', identificacionRoutes1)
    }
    start(){ // Esta funcion arrancara nuestro servidor, y le asignara el puerto de la configuracion
        this.app.listen(this.app.get('port'), 
        () => {
            console.log(`Server on port: ${this.app.get('port')}`)
        })
    }
}

const server = new Servidor()
server.start()