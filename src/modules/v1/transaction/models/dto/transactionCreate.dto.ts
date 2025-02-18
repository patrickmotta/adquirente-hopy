import {
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	ValidateNested,
} from 'class-validator'
import { PaymentsMethodsEnum } from '../../resources/enum/paymentsMethods.enum'
import { Transform, Type } from 'class-transformer'
import { CustomerDto } from './customer.dto'

export class TransactionCreateDto {
	id!: number

	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	amount!: number

	@IsNotEmpty()
	@IsString()
	currency!: string

	@IsNotEmpty()
	@IsEnum(PaymentsMethodsEnum)
	paymentMethod!: PaymentsMethodsEnum

	@IsNotEmpty()
	@IsString()
	description!: string

	@ValidateNested()
	@Type(() => CustomerDto)
	customer!: CustomerDto
}
