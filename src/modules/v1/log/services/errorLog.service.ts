import { Injectable } from '@nestjs/common'
import { ErrorLogEntity } from '@modules/v1/log/models/entities/error.entity'
import { LogRepository } from '../repositories/log.repository'

@Injectable()
export class ErrorLogService {
	constructor(private logRepository: LogRepository) {
		//
	}

	async store(error: Partial<ErrorLogEntity>): Promise<void> {
		await this.logRepository.errorStore(error)
	}
}
