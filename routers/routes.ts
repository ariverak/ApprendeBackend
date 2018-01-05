import * as express from "express"; // el routing neceista del servidor express
import * as auth from "../middlewares/authorization";
import * as alumnosCtl from "../controllers/AlumnoController";
import * as usuariosCtl from "../controllers/UsuarioController";
import * as cursosCtl from "../controllers/CursoController";
// exportamos la funcion que utiliza posteriormeente el archivo init.ts para iniciar el encapsulamiento de
// retun controller --> retorna route( app )
export default (app) => {

    const apiRoutes = express.Router(); // la utilizaremos para que englobe todas las rutas
    const alumnosRoutes = express.Router();
    const usuarioRoutes = express.Router();
    const cursosRoutes = express.Router();
    const asignaturasRoutes = express.Router();

    //trae los alumnos que posee el propietario del token
    alumnosRoutes.get("/",auth.authorize("User"),alumnosCtl.getAllAlumFromUsr);
    alumnosRoutes.get("/curso/:id",auth.authorize("User"),alumnosCtl.getAllAlumFromUsrAndCurso);
    apiRoutes.use("/alumnos", alumnosRoutes);
   
    // routes para api usuarios
    usuarioRoutes.post("/authenticate", usuariosCtl.authenticateUser);
    apiRoutes.use("/usuarios",usuarioRoutes);

     // routes para api cursos
     cursosRoutes.get("/:id",auth.authorize("User"), cursosCtl.getAllAlumFromCurso);
     cursosRoutes.get("/",auth.authorize("User"), cursosCtl.getAllCursoFromDocente);
     cursosRoutes.get(":id/asignaturas",auth.authorize("User"), cursosCtl.getAllAsignaturasFromCurso);
     apiRoutes.use("/cursos",cursosRoutes);

    app.use("/api", apiRoutes);
};