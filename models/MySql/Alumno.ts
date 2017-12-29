import {Entity,Column,Table,OneToMany,ManyToOne,JoinColumn, PrimaryGeneratedColumn} from "typeorm";
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
}