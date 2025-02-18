import { Injectable } from '@nestjs/common'
import { ErrorLogEntity } from '../models/entities/error.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { AppErrorException } from '@common/exception/appError.exception'
import { IStoreErrorLogInput } from '../resources/interfaces/repositories/errorLogRepository.interface'
import { RequestLogEntity } from '../models/entities/request.entity'
import { IStoreRequestLogInput } from '../resources/interfaces/repositories/requestLogRepository.interface'
import { SendLogEntity } from '../models/entities/send.entity'
import { IStoreSendLogInput } from '../resources/interfaces/repositories/sendLogRepository.interface'

@Injectable()
export class LogRepository {
	constructor(
		@InjectRepository(ErrorLogEntity, 'PGLogs')
		private errorLogRepository: Repository<ErrorLogEntity>,
		@InjectRepository(RequestLogEntity, 'PGLogs')
		private requestLogRepository: Repository<RequestLogEntity>,
		@InjectRepository(SendLogEntity, 'PGLogs')
		private sendLogRepository: Repository<SendLogEntity>,
	) {}

	async errorStore(error: IStoreErrorLogInput): Promise<void> {
		try {
			await this.errorLogRepository.save(error)
		} catch (error) {
			throw new AppErrorException({
				message: 'Erro ao salvar log de erro',
				errorCode: 'REPOSITORY_ERROR_LOG_STORE',
				internalMessage: error,
			})
		}
	}

	async requestStore(request: IStoreRequestLogInput): Promise<void> {
		try {
			await this.requestLogRepository.save(request)
		} catch (error) {
			throw new AppErrorException({
				message: 'Erro ao armazenar request log',
				errorCode: 'REPOSITORY_REQUEST_LOG_STORE',
				internalMessage: error,
			})
		}
	}

	async sendStore(send: IStoreSendLogInput): Promise<void> {
		try {
			await this.sendLogRepository.save(send)
		} catch (error) {
			throw new AppErrorException({
				message: 'Erro ao armazenar send log',
				errorCode: 'REPOSITORY_SEND_LOG_STORE',
				internalMessage: error,
			})
		}
	}
}
