import { projectName } from '@common/utils/projectName'
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ database: 'logs', schema: projectName, name: 'error_log' })
export class ErrorLogEntity {
	@PrimaryGeneratedColumn({ name: 'id', type: 'int' })
	id?: number

	@Column({ name: 'method', nullable: false })
	method!: string

	@Column({ name: 'path', nullable: false })
	path!: string

	@Column({ name: 'request', nullable: false, type: 'jsonb' })
	request!: string | object

	@Column({ name: 'error', nullable: false, type: 'jsonb' })
	error!: string | object

	@CreateDateColumn({ name: 'created_at', type: 'timestamp' })
	createdAt?: Date
}
