"use strict";
// Realizaremos una importacion de los componentes que utilizaremos de mongoose
// En este caso el recurso "Schema", y el recurso "Model"
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
exports.DB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class DataBaseConec {
    constructor() {
        this._conexion = 'mongodb+srv://prueba:123@cluster0.riz7l.mongodb.net/<dbname>?retryWrites=true&w=majority';
        // Crearemos una función de tipo asincrona para conectarnos a la base de datos
        this.conectarBD = () => __awaiter(this, void 0, void 0, function* () {
            const promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield mongoose_1.default.connect(this._conexion, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    useFindAndModify: false // Habilita el uso de findOneAndDelete y findAndModify
                })
                    .then(() => resolve(`Conexion completa a ${this._conexion}`))
                    .catch((error) => reject(`No se ha podido conectar a ${this._conexion}: ${error}`));
            }));
            return promise;
        });
        // Crearemos una función de tipo asincrona para conectarnos a la base de datos
        this.desconectarBD = () => __awaiter(this, void 0, void 0, function* () {
            const promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield mongoose_1.default.disconnect()
                    .then(() => resolve(`Desconectado de ${this._conexion}`))
                    .catch((error) => reject(`Desconexion fallida de ${this._conexion}: ${error}`));
            }));
            return promise;
        });
    }
    set conexion(_conexion) {
        this._conexion = _conexion;
    }
}
exports.DB = new DataBaseConec();
