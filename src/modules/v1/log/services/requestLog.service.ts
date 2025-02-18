import { Injectable } from '@nestjs/common'
import { RequestLogEntity } from '@modules/v1/log/models/entities/request.entity'
import { LogRepository } from '../repositories/log.repository'

@Injectable()
export class RequestLogService {
	constructor(private logRepository: LogRepository) {
		//
	}

	async store(request: RequestLogEntity): Promise<void> {
		await this.logRepository.requestStore(request)
	}
}
