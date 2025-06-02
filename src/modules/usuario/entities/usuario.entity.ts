import { Endereco } from 'src/modules/endereco/entities/endereco.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  USER = 'USER',
  ENTREGADOR = 'ENTREGADOR',
  LOJISTA = 'LOJISTA',
}

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  username: string;

  @Column()
  senha: string;

  @Column()
  email: string;

  @Column({
    type: 'varchar',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToOne(() => Endereco, { cascade: true, eager: true })
  @JoinColumn({ name: 'id_Endereco' }) // opcional: força o nome da coluna no banco
  endereco: Endereco;  
}
