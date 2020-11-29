"use strict";
// Realizaremos las importaciones de los modulos, clases, tipo ,etc, que sean necesarias
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const instRoutes_1 = require("./routes/instRoutes");
const idRoutes_1 = require("./routes/idRoutes");
class Servidor {
    constructor() {
        this.app = express_1.default();
        this.configuracion();
        this.routes();
    }
    configuracion() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.set('port', process.env.PORT || 3000); // Indicamos el puerto de local host que utilizará nuestro servidor
            this.app.use(express_1.default.json()); // Permite al navegador mostrar el formato json
            this.app.use(morgan_1.default('dev')); // Esto mostrara las url introducidas
        });
    }
    routes() {
        this.app.use('/instalacion', instRoutes_1.instalacion1);
        this.app.use('/id', idRoutes_1.identificacionRoutes1);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port: ${this.app.get('port')}`);
        });
    }
}
const server = new Servidor();
server.start();
