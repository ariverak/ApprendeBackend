import * as express from "express";
import "reflect-metadata";
import service  from "./middlewares/server";
import {createConnection} from "typeorm";
import router from "./routers/routes"; // importa el archivo routes.ts, para poder ocupar las rutas del proyecto
import config from "./config/main"; // importa arcvhio main.ts, el cual debe tener todas las propiedaeds que serán propias de configuracion, conexion string, puertos, folder, credenciales, etc


// init express (WebServer)
const app = express(); // se crea una variable que contega a express, para poder implementar el web server

const  cnx = "default"; /// request.cliente
createConnection( cnx ).then(async connection => { 
    await console.log("conexion a mysql exitosa" ); // agrega una conneccion a mysql por medio de typeorm
 }).catch(error => {
    console.log(" Error en conexion " + error);
});  
 

service( app );
// routers

router( app );
// la importacion de routes, retorna una funcion, la cual se utiliza para el direccionamiento e implementacion de rutas y activacion sobre express

// init server
let server;
server = app.listen( config.port, () => {
    console.log ( `server start in port ${config.port}`);
});


