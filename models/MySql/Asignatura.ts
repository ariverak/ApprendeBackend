import {Entity,Column, PrimaryGeneratedColumn,Table,ManyToOne,OneToMany,JoinColumn} from "typeorm";
import {AlumnoAsignatura} from "./Index"
@Entity()
@Table("Asignatura")
export class Asignatura {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column("string",{length : 75})
    Nombre: string;
    @OneToMany(type => AlumnoAsignatura, alumnoAsignatura => alumnoAsignatura.Asignatura) 
    AlumnoAsignatura: AlumnoAsignatura[];
    
}