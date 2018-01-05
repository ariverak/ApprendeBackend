import * as Entities from "../models/MySql/Index";
import config from "../config/main";
import {getConnection} from "typeorm";


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
