import { RequestLogEntity } from '@modules/v1/log/models/entities/request.entity'

export type IStoreRequestLogInput = Partial<RequestLogEntity>

export interface IRequestLogRepository {
	store(input: IStoreRequestLogInput): Promise<void>
}
