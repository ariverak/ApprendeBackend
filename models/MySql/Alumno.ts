import {Entity,Column, PrimaryColumn,Table,OneToMany,ManyToOne,JoinColumn} from "typeorm";
import {AlumnoUsuario,AlumnoAsignatura,Curso} from "./Index"
@Entity()
@Table("Alumno")
export class Alumno {
    @PrimaryColumn()
    Id: number;
    @Column("int")
    Rut: number;
    @Column("string",{length : 60})
    Nombre: string;
    @Column("string",{length : 60})
    Apellido: string;
    @ManyToOne(type => Curso)
    @JoinColumn({name: "IdCurso"}) 
    Curso: Curso;
    @OneToMany(type => AlumnoUsuario, alumnoUsuario => alumnoUsuario.Alumno) 
    AlumnoUsuario: AlumnoUsuario[];
    @OneToMany(type => AlumnoAsignatura, alumnoAsignatura => alumnoAsignatura.Alumno) 
    AlumnoAsignatura: AlumnoAsignatura[];
    
}