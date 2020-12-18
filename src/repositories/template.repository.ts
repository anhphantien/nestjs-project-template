import { Template } from '@/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Template)
export class TemplateRepository extends Repository<Template> { }
