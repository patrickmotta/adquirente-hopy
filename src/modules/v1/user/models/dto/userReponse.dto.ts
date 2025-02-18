import { PartialType } from '@nestjs/swagger'
import { UserCreateDto } from './userCreate.dto'
import { Exclude } from 'class-transformer'

export class UserResponseDto extends PartialType(UserCreateDto) {
	@Exclude()
	password?: string
}
