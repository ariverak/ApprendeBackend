import {Entity,Column,Table,OneToMany,ManyToOne,JoinColumn, PrimaryGeneratedColumn} from "typeorm";
@Entity()
@Table("Usuario")
export class Usuario {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column("string",{length:80})
    Nombre: number;
    @Column("string",{length : 40})
    Nick: string;
    @Column("string",{length : 40})
    Clave: string;
    @Column("string",{length : 65})
    Email: string;
    @Column("string",{length : 200})
    Foto: string;
    @Column("string",{length : 20})
    Fono: string;
    @Column("string",{length : 16})
    Rol: string;
    @Column("int")
    Estado: number;
}