import { Injectable } from '@nestjs/common'
import { ITransaction } from '../resources/interfaces/transaction.interface'
import { HopyRepository } from '../repositories/hopy.repository'

interface IInput {
	id: string
}

type IOutput = ITransaction

@Injectable()
export class HopyRefundTransactionService {
	constructor(private readonly hopyRepository: HopyRepository) {}

	async execute(input: IInput): Promise<IOutput> {
		return this.hopyRepository.refund(input)
	}
}
