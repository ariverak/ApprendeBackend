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


export async function getAllAsignaturasFromCurso(req, res, next) {
    let connection = getConnection();
    let asignaturas = await connection.getRepository(Entities.Asignatura).
    createQueryBuilder("a").innerJoin("a.AlumnoAsignatura", "aa")
        .innerJoin("aa.Alumno", "al").innerJoin("al.Curso", "c")
        .innerJoin("c.DocenteCurso", "dc").innerJoin("dc.Docente", "d")
        .innerJoin("d.Usuario", "u").where(`u.Nick = '${req.nick}'`)
        .andWhere(`c.Id = '${req.params.idCurso}'`)
        .select(["a.Id", "a.Nombre"]).groupBy("a.Nombre").getRawMany();
    if (asignaturas == null) {
        res.status(404).json({
            "error": "no tiene asignaturas"
        });
    } else {
            res.status(200).json(asignaturas);
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