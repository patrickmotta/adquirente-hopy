import { AppErrorException } from '@common/exception/appError.exception'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { ITransaction } from '../resources/interfaces/transaction.interface'
import { SendLogService } from '@modules/v1/log/services/sendLog.service'

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
	constructor(
		private readonly httpService: HttpService,
		private readonly sendLogStoreService: SendLogService,
	) {}

	async getAllTransactions(): Promise<ITransaction[]> {
		try {
			const response = await firstValueFrom(
				this.httpService.get('v1/transactions'),
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
		const timeExecute = Date.now()
		try {
			const response = await firstValueFrom(
				this.httpService.post('v1/transactions', transaction),
			)

			await this.sendLogStoreService.store({
				method: 'POST',
				path: 'v1/transactions',
				request: transaction,
				response: response.data,
				status: response.status,
				time: String(Date.now() - timeExecute),
			})

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
		const timeExecute = Date.now()
		try {
			const response = await firstValueFrom(
				this.httpService.post(`v1/transactions/${id}/refund`),
			)

			await this.sendLogStoreService.store({
				method: 'POST',
				path: `v1/transactions/${id}/refund`,
				request: {},
				response: response.data,
				status: response.status,
				time: String(Date.now() - timeExecute),
			})

			return response.data
		} catch (err) {
			const error = err as { message: string }
			throw new AppErrorException({
				message: 'Erro ao realizar o reembolso da transação',
				errorCode: 'HP_REFUND_TRANSACTIONS',
				internalMessage: error.message,
			})
		}
	}
}
