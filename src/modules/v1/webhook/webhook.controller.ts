import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { ITransaction } from '../hopy/resources/interfaces/transaction.interface'
import { HostGuard } from './resources/guard/host.guard'
import { WebhookHopyTransactionService } from './services/webhookHopyTransaction.service'

@ApiExcludeController()
@Controller('v1/webhook')
export class WebhookController {
	constructor(
		private readonly webhookHopyTransactionService: WebhookHopyTransactionService,
	) {}

	// @UseGuards(HostGuard)
	@Post('/hopy/transation')
	async transaction(@Body() body: ITransaction): Promise<object> {
		return this.webhookHopyTransactionService.execute(body)
	}
}
