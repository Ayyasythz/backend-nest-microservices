import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({default: true})
  isActive: boolean;

  @BeforeInsert()
  async hashPassword(){
    this.password = await hash(this.password, 10)
  }
}