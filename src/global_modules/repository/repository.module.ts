import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as repositories from '../../repositories';

const repositoryModule = TypeOrmModule.forFeature(Object.values(repositories));

@Global()
@Module({
  imports: [repositoryModule],
  providers: repositoryModule.providers,
  exports: repositoryModule.exports,
})

export class RepositoryModule { }
