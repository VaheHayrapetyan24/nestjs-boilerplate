import { HttpException, HttpStatus } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

export abstract class BaseService<T> extends TypeOrmCrudService<T>{
    async findOneOrThrow (options: object): Promise<T> {
        const entity = await this.findOne(options);
        if (!entity) {
            throw new HttpException(`${this.repo.metadata.name} not found`, HttpStatus.NOT_FOUND);
        }
        return entity;
    }

    async createAndSave (entity: object): Promise<T> {
        const createdEntity = this.repo.create(entity);
        return this.repo.save(createdEntity);
    }
}
