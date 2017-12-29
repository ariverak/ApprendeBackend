import * as Entities from "../models/MySql/Index";
import config from "../config/main";
import {getConnection} from "typeorm";


export async function getAllAlumFromUsr(req, res, next) {
    let connection = getConnection();

    let alumnos = await connection.getRepository(Entities.Alumno).
    createQueryBuilder("a").innerJoin("a.AlumnoUsuario", "au")
        .innerJoin("au.Usuario", "u").where(`u.Nick = '${req.nick}'`).
    select(["a.Nombre", "a.Apellido"]).getRawMany();
    if (alumnos == null) {
        res.status(404).json({
            "error": "no existen alumnos"
        });
    } else {
            res.status(200).json(alumnos);
    }
}

export async function getAllAlum(req, res, next) {
    let connection = getConnection();
    let alumnos = await connection.getRepository(Entities.Alumno).createQueryBuilder("a").
    select(["a.Nombre","a.Apellido"]).execute();
    if(alumnos.length > 0){
        res.status(200).json( { alumnos } );
    }else{
        res.status(404).json({"error": "no hay registros"});
    }
}