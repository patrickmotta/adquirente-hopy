import { Injectable } from '@nestjs/common'
import { SendLogEntity } from '@modules/v1/log/models/entities/send.entity'
import { LogRepository } from '../repositories/log.repository'

@Injectable()
export class SendLogService {
	constructor(private logRepository: LogRepository) {
		//
	}

	async store(send: SendLogEntity): Promise<void> {
		await this.logRepository.sendStore(send)
	}
}
