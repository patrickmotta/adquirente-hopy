import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserRepository } from './repositories/user.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './models/entities/user.entity'
import { dynamicImport } from '@common/utils/dynamicImport'
import { BcryptService } from '../auth/services/bcrypt.service'

const services = dynamicImport({
	dir: __dirname,
	extension: 'service',
})

const validators = dynamicImport({
	dir: __dirname + '/resources',
	extension: 'validator',
})

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity], 'PGService')],
	controllers: [UserController],
	providers: [...services, UserRepository, BcryptService, ...validators],
	exports: [...services],
})
export class UserModule {}
