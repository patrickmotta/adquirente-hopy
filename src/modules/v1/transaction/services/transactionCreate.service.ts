import { Injectable } from '@nestjs/common'
import { TransactionCreateDto } from '../models/dto/transactionCreate.dto'
import { TransactionRepository } from '../repositories/transaction.repository'
import { TransactionStatusEnum } from '../resources/enum/transactionStatus.enum'
import { plainToClass } from 'class-transformer'
import { CustomerDto } from '../models/dto/customer.dto'

@Injectable()
export class TransactionCreateService {
	constructor(private readonly transactionRepostory: TransactionRepository) {}
	async execute(transactionDto: TransactionCreateDto): Promise<object> {
		console.log('a', plainToClass(TransactionCreateDto, transactionDto))
		await this.transactionRepostory.store({
			...transactionDto,
			customerEmail: transactionDto.customer.email,
			customerName: transactionDto.customer.name,
			status: TransactionStatusEnum.PENDING,
			transactionId: '12385',
		})

		return {
			transactionId: '123456',
			status: 'PENDING',
			created_at: '2025-02-11T15:29:34Z',
		}
	}
}
