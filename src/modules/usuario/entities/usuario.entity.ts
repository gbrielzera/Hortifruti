import { BeforeInsert, Column, PrimaryColumn, Entity } from "typeorm";

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment
const { nanoid } = require('nanoid');

@Entity('usuario')
export class Usuario {

    @PrimaryColumn()
    id_usuario: string

    @Column()
    username: string;

    @Column()
    senha: string;

    @BeforeInsert()    
    generateId() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this.id_usuario = `userID_${nanoid()}`
    }

}
