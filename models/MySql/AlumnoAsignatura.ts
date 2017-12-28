import {Entity,Column, PrimaryGeneratedColumn,Table,ManyToOne, JoinColumn} from "typeorm";
import {Alumno,Asignatura} from "./Index"
@Entity()
@Table("AlumnoAsignatura")
export class AlumnoAsignatura {
    @PrimaryGeneratedColumn()
    Id: number;
    @ManyToOne(type => Alumno, alumno => alumno.AlumnoAsignatura)
    @JoinColumn({name : "IdAlumno"})
    Alumno: Alumno;
    @ManyToOne(type => Asignatura, asignatura => asignatura.AlumnoAsignatura)
    @JoinColumn({name : "IdAsignatura"})
    Asignatura: Asignatura;
}