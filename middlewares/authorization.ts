import config from "../config/main";
import * as jwt from "jwt-simple";
import * as moment from "moment";
import * as Cryptr from 'cryptr';

export function authorize(rol: string) {
  //instancia un objeto de tipo Cryptr y lo incializa con la clave
  let cryptr = new Cryptr(config.encryp_secret);
  //crea una variable que sera enviada hacia la funccion siguiente en caso de que lo requiera
  return (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(403).json({
        "message": "no ha enviado una autorizacion"
      });
    } else {
      try {
        let isBearer = req.headers.authorization.startsWith("Bearer ")
        if (isBearer) {
          // despeja el Bearer del token
          let token =  req.headers.authorization.split(" ")[1];
          //desencripta el jwt
          let payload = jwt.decode(token, config.encryp_secret);

          let rolToken = cryptr.decrypt(payload.rol);
          if ( rolToken == rol) {
            //pasa el nick que viene en el token para pasarlo a la siguiente funcion
            req.nick = cryptr.decrypt(payload.sub);
            //si la fecha de expiracion es menor que la fecha actual, significa que expiro
            if (cryptr.decrypt(payload.exp) <= moment().unix()) {
              return res.status(401).json({
                "message": "el token ha expirado"
              });
            }
          } else {

            if ( rolToken != "Admin"){
              return res.status(403).json({
                "message": "no tienes autorización"
              }); 
            } 
          }
        }else{
          return res.status(500).json({
            "message": "falta identificador bearer"
          });
        }
      } catch (err) {
        return res.status(500).json({
          "message": "token invalido"
        });
      }
    }
    next();
  }
}