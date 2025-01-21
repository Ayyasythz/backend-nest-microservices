import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import {config} from 'dotenv'

config()
const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: parseInt(configService.get<string>('DATABASE_PORT')),
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
  logging: true
})

export default AppDataSource;