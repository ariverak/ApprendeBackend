import {Entity,Column, PrimaryColumn,Table,OneToMany} from "typeorm";
import {AlumnoUsuario} from "./Index"
@Entity()
@Table("Usuario")
export class Usuario {
    @PrimaryColumn("int")
    Rut: number;
    @Column("string",{length : 45})
    Nombre: string;
    @Column("string",{length : 40})
    Nick: string;
    @Column("string",{length : 40})
    Clave: string;
    @Column("string",{length : 65})
    Email: string;
    @Column("string",{length : 200})
    Foto: string;
    @Column("int")
    Fono: number;
    @Column("string",{length : 16})
    Rol: string;
    @Column("smallint",{length : 1})
    Estado: number;

    @OneToMany(type => AlumnoUsuario, clienteUsuario => clienteUsuario.Usuario) 
    AlumnoUsuario: AlumnoUsuario[];
}