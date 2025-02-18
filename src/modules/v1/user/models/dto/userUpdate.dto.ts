import { PartialType } from '@nestjs/mapped-types'
import { UserCreateDto } from './userCreate.dto'
import { Exclude } from 'class-transformer'

export class UserUpdateDto extends PartialType(UserCreateDto) {
	@Exclude()
	password?: string
}
