import * as jwt from "jwt-simple";
import * as moment from "moment";
import * as Cryptr from "cryptr";
import config from "../config/main";
import {
    getConnection
} from "typeorm";
import * as Entities from "../models/MySql/Index";

export async function addUsuario(req, res, next) {
    let connection = getConnection();
    let cryp = new Cryptr(config.encryp_secret);
    let newUser = new Entities.Usuario();
    newUser.Nombre = req.body.nombre;
    newUser.Nick = req.body.nick.toUpperCase();
    newUser.Clave = cryp.encrypt(req.body.clave);
    newUser.Email = req.body.email;
    newUser.Fono = req.body.fono;
    newUser.Rol = req.body.rol;
    newUser.Estado = req.body.estado;
    try {
        await connection.getRepository(Entities.Usuario).persist(newUser);
        res.status(200).json({
            "success": "Usuario agregado exitosamente!"
        });
    } catch (err) {
        res.status(500).json({
            "error": "No se pudo agregar al usuario",
            "details": err
        });
    }

}
export async function authenticateUser(req, res, next) {
 //   console.log(req.body.rut);
    if (!req.body.nick || !req.body.clave || req.body.clave === '' || req.body.nick === '') {
        res.status(403).json({
            "success": false,
            "type": "error",
            "message": "Debe ingresar Credenciales de Acceso"
        });

    } else {
        let nick = req.body.nick;
        let clave = req.body.clave;

        let connection = getConnection();
        let cryp = new Cryptr(config.encryp_secret);
        //encripta la contraseña
      //  clave = cryp.encrypt(clave);
        let usuario = await connection.getRepository(Entities.Usuario).findOne({
            Nick: nick
        });
        if (usuario == null || usuario.Clave != clave) {
            res.status(403).json({
                "success": false,
                "type": "error",
                "message": "Usuario ingresado no existe"
            });
        } else {
            const payload = {
                rol: cryp.encrypt(usuario.Rol),
                sub: cryp.encrypt(usuario.Nick),
                aud: cryp.encrypt(config.jwtOptions.aud),
                iss: cryp.encrypt(config.jwtOptions.iss),
                iat: cryp.encrypt(moment().unix()),
                exp: cryp.encrypt(moment().add(14, "days").unix()),
            }
        //    console.log( usuario );
            res.status(200).json({
                "success": true,
                "type": "success",
                "message": "Bienvenido a Apprende",
                access_token: jwt.encode(payload, config.encryp_secret),
                "name":usuario.Nombre,
                "email": usuario.Email,
                "photo":usuario.Foto
            });
        }

    }
}