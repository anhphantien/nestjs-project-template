import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import repositories = require('../../repositories');

const repositoryModule = TypeOrmModule.forFeature(Object.values(repositories));

@Global()
@Module({
  imports: [repositoryModule],
  providers: repositoryModule.providers,
  exports: repositoryModule.exports,
})
export class RepositoryModule { }
