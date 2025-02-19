import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AppErrorException } from '@common/exception/appError.exception'
import { transactionEntity } from '../models/entities/transaction.entity'
import { TransactionStatusEnum } from '../resources/enum/transactionStatus.enum'

interface IGetByIdInput {
	id: string
}

type IGetByIdOutput = transactionEntity

interface IUpdateStatusInput {
	transactionId: string
	status: TransactionStatusEnum
}

type IUpdateStatusOutput = void
@Injectable()
export class TransactionRepository {
	constructor(
		@InjectRepository(transactionEntity, 'PGService')
		private readonly transactionRepository: Repository<transactionEntity>,
	) {}
	async store(transactionDto: transactionEntity): Promise<void> {
		try {
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

	async getById({ id }: IGetByIdInput): Promise<IGetByIdOutput> {
		try {
			const DBTransaction = await this.transactionRepository.findBy({
				transactionId: id,
			})

			return DBTransaction[0]
		} catch (err) {
			const error = err as { message: string }
			throw new AppErrorException({
				message: 'Falha buscar transação.',
				errorCode: 'PG_GET_ERROR',
				internalMessage: error.message,
			})
		}
	}

	async updateStatus({
		transactionId,
		status,
	}: IUpdateStatusInput): Promise<IUpdateStatusOutput> {
		try {
			await this.transactionRepository.update({ transactionId }, { status })
		} catch (err) {
			const error = err as { message: string }
			throw new AppErrorException({
				message: 'Falha atualizar status da transação.',
				errorCode: 'PG_STATUS_UPDATE_ERROR',
				internalMessage: error.message,
			})
		}
	}
}
