import {Entity,Column, PrimaryColumn,Table,ManyToOne,JoinColumn} from "typeorm";
import {Alumno,Usuario} from "./Index"
@Entity()
@Table("AlumnoUsuario")
export class AlumnoUsuario {
    @PrimaryColumn("int")
    Id: number;
    
    @ManyToOne(type => Usuario, usuario => usuario.AlumnoUsuario)
    @JoinColumn({name : "IdUsuario"})
    Usuario: Usuario;

    @ManyToOne(type => Alumno, alumno => alumno.AlumnoUsuario)
    @JoinColumn({name : "IdAlumno"})
    Alumno: Alumno;
}