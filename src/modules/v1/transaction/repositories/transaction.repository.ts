import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AppErrorException } from '@common/exception/appError.exception'
import { transactionEntity } from '../models/entities/transaction.entity'

@Injectable()
export class TransactionRepository {
	constructor(
		@InjectRepository(transactionEntity, 'PGService')
		private readonly transactionRepository: Repository<transactionEntity>,
	) {}
	async store(transactionDto: transactionEntity): Promise<void> {
		try {
			console.log(transactionDto)
			await this.transactionRepository.save(transactionDto)
		} catch (error) {
			const dbError = error as { message: string }
			throw new AppErrorException({
				message: 'Falha ao armazenar transação.',
				errorCode: 'PG_STORE_ERROR',
				internalMessage: dbError.message,
			})
		}
	}
}
