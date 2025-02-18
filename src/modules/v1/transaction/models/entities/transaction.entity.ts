import { projectName } from '@common/utils/projectName'
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { PaymentsMethodsEnum } from '../../resources/enum/paymentsMethods.enum'
import { TransactionStatusEnum } from '../../resources/enum/transactionStatus.enum'

@Entity({ name: 'transaction', schema: projectName, database: 'transaction' })
export class transactionEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column({
		name: 'transaction_id',
		type: 'varchar',
		length: 50,
		nullable: false,
		unique: false,
	})
	transactionId!: string

	@Column({
		name: 'amount',
		type: 'numeric',
		precision: 10,
		scale: 2,
		nullable: false,
	})
	amount!: number

	@Column({ name: 'currency', type: 'varchar', length: 3, nullable: false })
	currency!: string

	@Column({ name: 'payment_method ', type: 'varchar', nullable: false })
	paymentMethod!: PaymentsMethodsEnum

	@Column({ name: 'description', type: 'text' })
	description!: string

	@Column({ name: 'customer_name', type: 'varchar', length: 100 })
	customerName!: string

	@Column({ name: 'customer_email ', type: 'varchar', length: 100 })
	customerEmail!: string

	@Column({
		name: 'status',
		type: 'enum',
		enum: TransactionStatusEnum,
		default: TransactionStatusEnum.PENDING,
	})
	status!: TransactionStatusEnum

	@CreateDateColumn({ name: 'created_at' })
	created_at?: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updateAt?: Date
}
