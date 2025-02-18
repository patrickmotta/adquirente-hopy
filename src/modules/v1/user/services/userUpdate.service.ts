import { Injectable } from '@nestjs/common'
import { UserRepository } from '../repositories/user.repository'
import { UserUpdateDto } from '../models/dto/userUpdate.dto'
import { UserEntity } from '../models/entities/user.entity'

interface IUserUpdateServiceInput {
	user: UserEntity
	userUpdate: UserUpdateDto
}

interface IUserUpdateServiceOutput {
	message: string
}

@Injectable()
export class UserUpdateService {
	constructor(private readonly userRepository: UserRepository) {}

	async execute({
		user,
		userUpdate,
	}: IUserUpdateServiceInput): Promise<IUserUpdateServiceOutput> {
		Object.assign(user, userUpdate)

		await this.userRepository.update(user)

		return { message: 'User updated' }
	}
}
