import * as express from "express"; // el routing neceista del servidor express
import * as auth from "../middlewares/authorization";
//import * as alumnosCtl from "../controllers/AlumnoController";

// exportamos la funcion que utiliza posteriormeente el archivo init.ts para iniciar el encapsulamiento de
// retun controller --> retorna route( app )
export default (app) => {

    const apiRoutes = express.Router(); // la utilizaremos para que englobe todas las rutas
    const alumnosRoutes = express.Router(); 

    //trae los alumnos que posee el propietario del token
    //alumnosRoutes.get("/", auth.authorize("User"),usuariosCtl.getAllAlumnos);

    // esta linea crea un middleware el cual crea la ruta /alumnos y embebe los verbos y rutas que asignamos a alumnosRoute
    apiRoutes.use("/clientes", alumnosRoutes);
   
    app.use("/api", apiRoutes);
};