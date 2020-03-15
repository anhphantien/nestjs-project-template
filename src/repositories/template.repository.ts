import { EntityRepository, Repository } from 'typeorm';
import { Template } from '../entities';

@EntityRepository(Template)
export class TemplateRepository extends Repository<Template> { }
