import { Injectable } from '@nestjs/common'
import { HopyRepository } from '../repositories/hopy.repository'

@Injectable()
export class HopyGetTransactionService {
	constructor(private readonly hopyRepository: HopyRepository) {}

	async execute() {}
}
