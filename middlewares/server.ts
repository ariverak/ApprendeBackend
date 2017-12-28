import * as express from "express";  
import * as bodyParser from "body-parser";  
import * as logger from "morgan";
import * as helmet from "helmet";

export default (app) => { 
    app.use(  bodyParser.urlencoded( { extended: false} ) );  
    app.use(  bodyParser.json() );  
    app.use(  logger( "dev" ) );  
    app.use(  helmet()  );  
    
    app.use(function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
        next();
    });
};