import { Injectable } from '@nestjs/common'
import { TransactionStatusEnum } from '../resources/enum/transactionStatus.enum'
import { TransactionRepository } from '../repositories/transaction.repository'

interface IInput {
	id: string
	status: TransactionStatusEnum
}

type IOutput = void

@Injectable()
export class TransactionUpdateStatusService {
	constructor(private readonly transactionRepository: TransactionRepository) {}
	async execute({ id, status }: IInput): Promise<IOutput> {
		await this.transactionRepository.updateStatus({ transactionId: id, status })
	}
}
