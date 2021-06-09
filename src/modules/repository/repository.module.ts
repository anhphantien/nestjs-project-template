import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import repositories = require('../../repositories');

@Global()
@Module({
  providers: TypeOrmModule.forFeature(Object.values(repositories)).providers,
  exports: TypeOrmModule.forFeature(Object.values(repositories)).exports,
})
export class RepositoryModule {}
