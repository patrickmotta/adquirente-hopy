import { ErrorLogEntity } from '@modules/v1/log/models/entities/error.entity'

export type IStoreErrorLogInput = Partial<ErrorLogEntity>

export interface IErrorLogRepository {
	store(input: IStoreErrorLogInput): Promise<void>
}
