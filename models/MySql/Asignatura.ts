import {Entity,Column,Table,OneToMany,ManyToOne,JoinColumn, PrimaryGeneratedColumn} from "typeorm";
import {AlumnoAsignatura} from "./Index";
@Entity()
@Table("Asignatura")
export class Asignatura {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column("string",{length : 75})
    Nombre: string;

    @OneToMany( type=> AlumnoAsignatura,
        alumnoAsignatura => alumnoAsignatura.Asignatura)
        AlumnoAsignatura:AlumnoAsignatura[]
}