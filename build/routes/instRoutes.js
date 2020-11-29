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
Object.defineProperty(exports, "__esModule", { value: true });
exports.instalacion1 = void 0;
const express_1 = require("express");
const instalacion_1 = require("../models/instalacion");
const mongoatlas_1 = require("../database/mongoatlas");
class instalacionRoutes {
    constructor() {
        // Primero obtendremos todos las instalaciones almacenadas
        this.getInstalaciones = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield mongoatlas_1.DB.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield instalacion_1.Instalaciones.find();
                console.log(query);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            mongoatlas_1.DB.desconectarBD();
        });
        // Introduciremos nuevas intatalaciones a través de un cliente post (ej: Postman)
        this.nInstPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { tec, ident, altura, fecha, garantia, direc, aparatos } = req.body;
            console.log(ident);
            const iSchema = {
                _tec: tec,
                _ident: ident,
                _fecha: fecha,
                _garantia: Boolean(garantia),
                _direc: direc,
                _aparatos: aparatos
            };
            console.log(iSchema);
            const oSchema = new instalacion_1.Instalaciones(iSchema);
            yield mongoatlas_1.DB.conectarBD();
            yield oSchema.save()
                .then((doc) => {
                console.log('Salvado Correctamente: ' + doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.send('Error: ' + err);
            });
            // Debido a que estamos usando Mongoatlas gratis es importante que nos desconectamos de la sesion para que otros puedan conectarse
            yield mongoatlas_1.DB.desconectarBD();
        });
        // Listaremos las placas necesarias para las diferentes instalaciones almacenadas en la base de datos
        this.placas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let i1;
            let sup = 0;
            const { ident } = req.params;
            yield mongoatlas_1.DB.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                yield instalacion_1.Instalaciones.find((error, doc) => {
                    if (error) {
                        console.log(error);
                        res.json({ "error": "mensaje: " + error });
                    }
                    else {
                        console.log('Existe: ' + doc);
                        i1 = new instalacion_1.Instalacion(doc._tec, doc._ident, doc._fecha, doc._garantia, doc._direc, doc._aparatos);
                        i1.asolar = doc._asolar;
                        i1.sold = doc._sold;
                        sup = i1.calculo1();
                        res.json({ "id:": ident, "Placas": sup });
                    }
                });
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            mongoatlas_1.DB.desconectarBD();
        });
        this._ruta = express_1.Router();
    }
    get ruta() {
        return this._ruta;
    }
    Rutas() {
        this._ruta.get('/', this.getInstalaciones);
    }
}
const instalacion = new instalacionRoutes();
instalacion.Rutas();
exports.instalacion1 = instalacion.ruta;
