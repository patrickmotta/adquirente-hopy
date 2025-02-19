import { AppErrorException } from '@common/exception/appError.exception'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { ITransaction } from '../resources/interfaces/transaction.interface'
import { isAxiosError } from 'axios'

interface ICreateTransactionInput {
	amount: number
	currency: string
	paymentMethod: string
	customer: {
		name: string
		email: string
	}
	items: {
		title: string
		unitPrice: number
		quantity: number
		tangible: boolean
	}[]
}

interface IRefundInput {
	id: string
}

type IRefundOutput = ITransaction

@Injectable()
export class HopyRepository {
	constructor(private readonly httpService: HttpService) {}

	async getAllTransactions(): Promise<ITransaction[]> {
		try {
			const response = await firstValueFrom(
				this.httpService.get('/transactions'),
			)

			return response.data
		} catch (err) {
			const error = err as { message: string }
			throw new AppErrorException({
				message: 'Erro ao buscar as transações',
				errorCode: 'HP_GET_TRANSACTIONS',
				internalMessage: error.message,
			})
		}
	}

	async createTransaction(
		transaction: ICreateTransactionInput,
	): Promise<ITransaction> {
		try {
			const data = {
				...transaction,
				card: {
					number: 20231252321478986,
					holderName: 'teste',
					expirationMonth: 12,
					expirationYear: 2026,
					cvv: '123',
				},
			}
			const response = await firstValueFrom(
				this.httpService.post('/transactions', data),
			)

			return response.data
		} catch (err) {
			const error = err as { message: string }
			throw new AppErrorException({
				message: 'Erro ao registrar a transação',
				errorCode: 'HP_CREATE_TRANSACTIONS',
				internalMessage: error.message,
			})
		}
	}

	async refund({ id }: IRefundInput): Promise<IRefundOutput> {
		try {
			const response = await firstValueFrom(
				this.httpService.post(`transactions/${id}/refund`),
			)

			return response.data
		} catch (err) {
			if (isAxiosError(err)) console.log(err.response?.data)
			const error = err as { message: string }
			throw new AppErrorException({
				message: 'Erro ao realizar o reembolso da transação',
				errorCode: 'HP_REFUND_TRANSACTIONS',
				internalMessage: error.message,
			})
		}
	}
}
