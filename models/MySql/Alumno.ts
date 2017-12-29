import {Entity,Column,Table,OneToMany,ManyToOne,JoinColumn, PrimaryGeneratedColumn} from "typeorm";
import {AlumnoUsuario,Curso} from "./Index";
@Entity()
@Table("Alumno")
export class Alumno {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column("int")
    Rut: number;

    @Column("string",{length : 60})
    Nombre: string;

    @Column("string",{length : 60})
    Apellido: string;

    @Column("int")
    IdCurso: number;

    @OneToMany( type=> AlumnoUsuario, alumnoUsuario => alumnoUsuario.Alumno)
    AlumnoUsuario:AlumnoUsuario[];

    @ManyToOne( type=> Curso, curso => curso.Alumnos)
    @JoinColumn({name:"IdCurso"})
    Curso:Curso;
}