import { projectName } from '@common/utils/projectName'
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity({ name: 'users', schema: projectName, database: 'users' })
export class UserEntity {
	@PrimaryGeneratedColumn({ name: 'id', type: 'int' })
	id!: number

	@Column({ name: 'name', type: 'varchar', length: 200 })
	name!: string

	@Column({ unique: true })
	email!: string

	@Exclude()
	@Column()
	password!: string

	@Column({ default: true })
	active!: boolean

	@CreateDateColumn({ name: 'created_at' })
	createdAt?: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updateAt?: Date
}
