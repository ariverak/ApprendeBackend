import {Entity,Column,Table,OneToMany,ManyToOne,JoinColumn, PrimaryGeneratedColumn} from "typeorm";
import {Alumno,Usuario} from "./Index";
@Entity()
@Table("AlumnoUsuario")
export class AlumnoUsuario {

    @PrimaryGeneratedColumn()
    Id: number;

    @ManyToOne(type => Usuario,usuario => usuario.AlumnoUsuario)
    @JoinColumn({name: "IdUsuario"})
    Usuario:Usuario

    @ManyToOne(type => Alumno,alumno => alumno.AlumnoUsuario)
    @JoinColumn({name: "IdAlumno"})
    Alumno:Alumno
}