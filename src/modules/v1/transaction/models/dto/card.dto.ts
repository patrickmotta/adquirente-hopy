import {
	IsNotEmpty,
	IsNumber,
	MaxLength,
	Min,
	Max,
	Matches,
} from 'class-validator'

export class CardDto {
	@IsNotEmpty()
	@Matches(/^\d{1,20}$/, {
		message: 'O número do cartão deve ter no máximo 20 dígitos',
	})
	number!: string

	@IsNotEmpty()
	@Matches(/^[A-Za-z\s]+$/, {
		message: 'O nome do titular deve conter apenas letras e espaços',
	})
	holderName!: string

	@IsNotEmpty()
	@IsNumber()
	@Min(1, { message: 'O mês de expiração deve estar entre 1 e 12' })
	@Max(12, { message: 'O mês de expiração deve estar entre 1 e 12' })
	expirationMonth!: number

	@IsNotEmpty()
	@IsNumber()
	@Min(new Date().getFullYear() + 1, {
		message: 'O ano de expiração deve ser maior que o ano atual',
	})
	expirationYear!: number

	@IsNotEmpty()
	@MaxLength(4, { message: 'O CVV deve ter exatamente 4 dígitos' })
	cvv!: string
}
