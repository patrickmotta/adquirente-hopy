import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

import { EmailIsUnique } from '@modules/v1/user/resources/validators/emailIsUnique.validator'

export class UserCreateDto {
	id!: number

	@IsNotEmpty()
	@IsString()
	name!: string

	@IsNotEmpty()
	@IsEmail()
	@EmailIsUnique()
	email!: string

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	password!: string

	active!: boolean
}
