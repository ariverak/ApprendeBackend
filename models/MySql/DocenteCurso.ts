import {Entity,Column,Table,OneToMany,ManyToOne,JoinColumn, PrimaryGeneratedColumn} from "typeorm";
import {Docente,Curso} from "./Index";
@Entity()
@Table("DocenteCurso")
export class DocenteCurso {

    @PrimaryGeneratedColumn()
    Id: number;

    @ManyToOne(type => Docente,docente => docente.DocenteCurso)
    @JoinColumn({name: "IdDocente"})
    Docente:Docente

    @ManyToOne(type => Curso,curso => curso.DocenteCurso)
    @JoinColumn({name: "IdCurso"})
    Curso:Curso
}