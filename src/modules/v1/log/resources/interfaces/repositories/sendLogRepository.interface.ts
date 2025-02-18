import { SendLogEntity } from '@modules/v1/log/models/entities/send.entity'

export type IStoreSendLogInput = Partial<SendLogEntity>

export interface ISendLogRepository {
	store(input: IStoreSendLogInput): Promise<void>
}
