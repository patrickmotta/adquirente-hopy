import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dynamicImport } from '@common/utils/dynamicImport'
import { TransctionController } from './transaction.controller'
import { UserModule } from '../user/user.module'
import { transactionEntity } from './models/entities/transaction.entity'
import { TransactionRepository } from './repositories/transaction.repository'

const services = dynamicImport({
	dir: __dirname,
	extension: 'service',
})

@Module({
	imports: [
		TypeOrmModule.forFeature([transactionEntity], 'PGService'),
		UserModule,
	],
	controllers: [TransctionController],
	providers: [...services, TransactionRepository],
	exports: [...services],
})
export class TransactionModule {}
