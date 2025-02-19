import { Injectable } from '@nestjs/common'
import { TransactionCreateDto } from '../models/dto/transactionCreate.dto'
import { TransactionRepository } from '../repositories/transaction.repository'
import { TransactionStatusEnum } from '../resources/enum/transactionStatus.enum'
import { HopyCreateTransactionService } from '@modules/v1/hopy/services/hopyCreateTransaction.service'

@Injectable()
export class TransactionCreateService {
	constructor(
		private readonly transactionRepostory: TransactionRepository,
		private readonly hopyCreateTransactionService: HopyCreateTransactionService,
	) {}
	async execute(transactionDto: TransactionCreateDto): Promise<object> {
		const items = [
			{
				title: transactionDto.description,
				unitPrice: transactionDto.amount,
				quantity: 1,
				tangible: false,
			},
		]
		const hopyTransaction = await this.hopyCreateTransactionService.execute({
			...transactionDto,
			items,
		})

		await this.transactionRepostory.store({
			...transactionDto,
			customerEmail: transactionDto.customer.email,
			customerName: transactionDto.customer.name,
			status: TransactionStatusEnum.PENDING,
			transactionId: hopyTransaction.id,
		})

		return {
			transactionId: '123456',
			status: 'PENDING',
			created_at: '2025-02-11T15:29:34Z',
		}
	}
}
