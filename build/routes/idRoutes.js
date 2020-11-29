"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.identificacionRoutes1 = void 0;
const express_1 = require("express");
const mongoatlas_1 = require("../database/mongoatlas");
class identificacionRoutes {
    constructor() {
        this.getId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield mongoatlas_1.DB.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                res.send(mensaje);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            mongoatlas_1.DB.desconectarBD();
        });
        this._ruta = express_1.Router();
    }
    get router() {
        return this._ruta;
    }
    Rutas() {
        this._ruta.get('/', this.getId);
    }
}
const obj = new identificacionRoutes();
obj.Rutas();
exports.identificacionRoutes1 = obj.router;
