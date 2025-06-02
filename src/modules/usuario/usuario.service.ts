import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario, UserRole } from '../usuario/entities/usuario.entity';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';
import { Endereco } from 'src/modules/endereco/entities/endereco.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,
  ) {}


  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { username, email, senha, tipoPerfil, id_Endereco } = createUsuarioDto;
  
    const endereco = await this.enderecoRepository.findOneBy({ id_Endereco });
    if (!endereco) {
      throw new NotFoundException(`Endereço com id ${id_Endereco} não encontrado`);
    }
  
    const senhaCriptografada = await bcrypt.hash(senha, 10);
  
    const usuario = this.usuarioRepository.create({
      username,
      email,
      senha: senhaCriptografada,
      role: tipoPerfil ?? UserRole.USER,
      endereco,
    });
  
    return this.usuarioRepository.save(usuario);
  }
  
  
  

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOneBy({ id_usuario: id });
  }

  async update(id: number, updateDto: Partial<CreateUsuarioDto>): Promise<Usuario> {
    const usuario = await this.findOne(id);
    if (!usuario) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }

    // Atualiza campos se existirem no updateDto
    if (updateDto.username !== undefined) usuario.username = updateDto.username;
    if (updateDto.senha !== undefined) usuario.senha = updateDto.senha;
    if (updateDto.email !== undefined) usuario.email = updateDto.email;
    if (updateDto.tipoPerfil !== undefined) usuario.role = updateDto.tipoPerfil;

    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number) {
    const usuario = await this.usuarioRepository.findOneBy({ id_usuario:id });

    if (!usuario) {
      throw new NotFoundException(`Usario com ID ${id} não encontrado`);
    }


    await this.usuarioRepository.delete(id);
  }

  async findByUsername(username: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOneBy({ username });
  }
  
}
