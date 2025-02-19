import {
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	ValidateIf,
	ValidateNested,
} from 'class-validator'
import { PaymentsMethodsEnum } from '../../resources/enum/paymentsMethods.enum'
import { Type } from 'class-transformer'
import { CustomerDto } from './customer.dto'
import { CardDto } from './card.dto'

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

	@ValidateIf((o) => o.paymentMethod === PaymentsMethodsEnum.creditCard)
	@IsNotEmpty({
		message:
			'Os dados do cartão são obrigatórios para pagamentos com cartão de crédito',
	})
	@ValidateNested()
	@Type(() => CardDto)
	card!: CardDto
}
