import { Injectable } from '@nestjs/common'
import { HopyRepository } from '../repositories/hopy.repository'
import { ITransaction } from '../resources/interfaces/transaction.interface'

interface IInput {
	amount: number
	currency: string
	paymentMethod: string
	description: string
	customer: {
		name: string
		email: string
	}
	card: {
		number: string
		holderName: string
		expirationMonth: number
		expirationYear: number
		cvv: string
	}
	items: {
		title: string
		unitPrice: number
		quantity: number
		tangible: boolean
	}[]
}

@Injectable()
export class HopyCreateTransactionService {
	constructor(private readonly hopyRepository: HopyRepository) {}

	async execute(input: IInput): Promise<ITransaction> {
		return this.hopyRepository.createTransaction(input)
	}
}
