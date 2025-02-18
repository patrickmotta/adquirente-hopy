import { Injectable } from '@nestjs/common'
import { UserCreateDto } from '../models/dto/userCreate.dto'
import { UserRepository } from '../repositories/user.repository'

@Injectable()
export class UserCreateService {
	constructor(private userRepository: UserRepository) {
		//
	}
	async execute(userCreateDto: UserCreateDto): Promise<object> {
		await this.userRepository.create(userCreateDto)

		return { message: 'User created' }
	}
}
