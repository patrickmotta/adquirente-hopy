import { IsString, IsEmail } from 'class-validator'

export class CustomerDto {
	@IsString()
	name!: string

	@IsEmail()
	email!: string
}
