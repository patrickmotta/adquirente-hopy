import { Injectable } from '@nestjs/common'
import { TransactionRepository } from '../repositories/transaction.repository'
import { transactionEntity } from '../models/entities/transaction.entity'

interface IInput {
	id: string
}

type IOutput = transactionEntity

@Injectable()
export class TransactionGetByIdService {
	constructor(private readonly transactionRepository: TransactionRepository) {}

	async execute(input: IInput): Promise<IOutput> {
		return await this.transactionRepository.getById(input)
	}
}
