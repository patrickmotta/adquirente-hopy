import { projectName } from '@common/utils/projectName'
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ database: 'logs', schema: projectName, name: 'request_log' })
export class RequestLogEntity {
	@PrimaryGeneratedColumn({ name: 'id', type: 'int' })
	id?: number

	@Column({ name: 'method', nullable: false })
	method!: string

	@Column({ name: 'path', nullable: false })
	path!: string

	@Column({ name: 'request', nullable: false, type: 'jsonb' })
	request!: string | object

	@Column({ name: 'response', nullable: false, type: 'jsonb' })
	response!: string | object

	@Column({ name: 'time', nullable: true, type: 'varchar', length: 10 })
	time!: string

	@Column({ name: 'status', nullable: true })
	status!: number

	@CreateDateColumn({ name: 'created_at', type: 'timestamp' })
	createdAt?: Date
}
