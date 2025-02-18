import { Controller, Post, Body, UseGuards } from '@nestjs/common'

import { AuthTokenGuard } from '@modules/v1/auth/resources/guards/authToken.guard'

import { ApiBearerAuth } from '@nestjs/swagger'
import { TransactionCreateDto } from './models/dto/transactionCreate.dto'
import { TransactionCreateService } from './services/transactionCreate.service'

@Controller('v1/transaction')
export class TransctionController {
	constructor(
		private readonly transactionCreateService: TransactionCreateService,
	) {}

	@Post()
	@ApiBearerAuth()
	@UseGuards(AuthTokenGuard)
	async create(
		@Body() transactionCreateDto: TransactionCreateDto,
	): Promise<object> {
		return await this.transactionCreateService.execute(transactionCreateDto)
	}
}
