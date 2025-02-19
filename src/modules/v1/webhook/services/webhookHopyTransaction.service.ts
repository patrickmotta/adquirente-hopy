import { ITransaction } from '@modules/v1/hopy/resources/interfaces/transaction.interface'
import { TransactionStatusEnum } from '@modules/v1/transaction/resources/enum/transactionStatus.enum'
import { TransactionUpdateStatusService } from '@modules/v1/transaction/services/transactionUpdateStatus.service'
import { Injectable } from '@nestjs/common'

type IInput = ITransaction

interface IOutput {
	message: string
}

@Injectable()
export class WebhookHopyTransactionService {
	constructor(
		private readonly transactionUpdateStatusService: TransactionUpdateStatusService,
	) {}

	async execute(transaction: IInput): Promise<IOutput> {
		if (transaction?.status in TransactionStatusEnum)
			await this.transactionUpdateStatusService.execute({
				id: transaction.id,
				status:
					TransactionStatusEnum[
						transaction.status as keyof typeof TransactionStatusEnum
					],
			})

		return {
			message: 'Received',
		}
	}
}
