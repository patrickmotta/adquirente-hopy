import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common'

import { AuthTokenGuard } from '@modules/v1/auth/resources/guards/authToken.guard'

import { ApiBearerAuth, ApiParam } from '@nestjs/swagger'
import { TransactionCreateDto } from './models/dto/transactionCreate.dto'
import { TransactionCreateService } from './services/transactionCreate.service'
import { TransactionGetByIdService } from './services/transactionGetById.service'
import { TransactionRefundService } from './services/transactionRefund.service'

@Controller('v1/transaction')
@UseGuards(AuthTokenGuard)
export class TransctionController {
	constructor(
		private readonly transactionCreateService: TransactionCreateService,
		private readonly transactionGetByIdService: TransactionGetByIdService,
		private readonly transactionRefundService: TransactionRefundService,
	) {}

	@Post()
	@ApiBearerAuth()
	async create(
		@Body() transactionCreateDto: TransactionCreateDto,
	): Promise<object> {
		return await this.transactionCreateService.execute(transactionCreateDto)
	}

	@Get(':id')
	@ApiBearerAuth()
	@ApiParam({ name: 'id', required: true, type: 'number' })
	async getById(@Param('id') id: string): Promise<object> {
		return this.transactionGetByIdService.execute({ id })
	}

	@ApiBearerAuth()
	@Post(':id/refund')
	async refund(@Param('id') id: string): Promise<object> {
		return this.transactionRefundService.execute({ id })
	}
}
