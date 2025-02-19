import { HopyRefundTransactionService } from '@modules/v1/hopy/services/hopyRefundTransaction.service'
import { Injectable } from '@nestjs/common'
import { TransactionUpdateStatusService } from './transactionUpdateStatus.service'
import { TransactionStatusEnum } from '../resources/enum/transactionStatus.enum'

interface IInput {
	id: string
}

interface IOutput {
	transactionId: string
	status: string
	refundedAt: string
}

@Injectable()
export class TransactionRefundService {
	constructor(
		private readonly hopyRefundTransactionService: HopyRefundTransactionService,
		private readonly tranctionUpdateStatusService: TransactionUpdateStatusService,
	) {}

	async execute({ id }: IInput): Promise<IOutput> {
		const hopyTransaction = await this.hopyRefundTransactionService.execute({
			id,
		})

		await this.tranctionUpdateStatusService.execute({
			id,
			status: TransactionStatusEnum.REFUNDED,
		})

		return {
			transactionId: hopyTransaction.id,
			refundedAt: hopyTransaction.updatedAt,
			status: hopyTransaction.status,
		}
	}
}
