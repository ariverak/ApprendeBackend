import {
    getConnection
} from "typeorm";
import * as Entities from "../models/MySql/Index";

export async function getAllAlumFromCurso(req, res, next) {
    let connection = getConnection();
    let idCurso = req.params.id;
    let alumnos = await connection.getRepository(Entities.Curso).createQueryBuilder("c").
    innerJoin("c.Alumnos","a").where(`c.Id = ${idCurso}`)
    .select(["a.Nombre","a.Apellido"]).getRawMany();
    if (alumnos.length == 0) {
        res.status(404).json({
            "error": "no existen alumnos"
        });
    } else {
            res.status(200).json(alumnos);
    }
}

export async function getAllCursoFromDocente(req, res, next) {
    let connection = getConnection();
    let cursos = await connection.getRepository(Entities.Curso).createQueryBuilder("c").
    innerJoin("c.DocenteCurso","dc").innerJoin("dc.Docente","d")
    .innerJoin("d.Usuario","u").where(`u.Nick = '${req.nick}'`)
    .select(["c.Id","c.Grado","c.Letra"]).getRawMany();
    if (cursos.length == 0) {
        res.status(404).json({
            "error": "no existen cursos para este docente"
        });
    } else {
            res.status(200).json(cursos);
    }
}