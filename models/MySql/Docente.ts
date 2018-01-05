import {Entity,Column,Table,OneToMany,ManyToOne,JoinColumn, PrimaryGeneratedColumn} from "typeorm";
import {Usuario} from "./Index";
@Entity()
@Table("Docente")
export class Docente {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column("int")
    Rut: number;

    @Column("string",{length:60})
    Nombre: number;

    @Column("string",{length : 60})
    Apellido: string;

    @ManyToOne( type=> Usuario, usuario => usuario.Docentes)
    @JoinColumn({name:"IdUsuario"})
    Usuario:Usuario;
}