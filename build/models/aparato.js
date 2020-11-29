"use strict";
// Realizaremos una importacion de los componentes que utilizaremos de mongoose
// En este caso el recurso "Schema", y el recurso "Model"
Object.defineProperty(exports, "__esModule", { value: true });
exports.aparatoSchema = exports.Aparato = void 0;
const mongoose_1 = require("mongoose");
class Aparato {
    constructor(nombre, cant, carga, uso) {
        this._nombre = nombre;
        this._cant = cant;
        this._carga = carga;
        this._uso = uso;
    }
}
exports.Aparato = Aparato;
// A continuación defineremos el esquema 
exports.aparatoSchema = new mongoose_1.Schema({
    _nombre: {
        type: String,
        required: true,
        maxlength: 30,
    },
    _cant: {
        type: Number,
        required: true,
        min: 1
    },
    _carga: {
        type: Number,
        required: true,
        min: 1
    },
    _uso: {
        type: Number,
        required: true,
        min: 0.30,
        max: 24
    },
});
