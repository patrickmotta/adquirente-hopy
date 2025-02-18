import { Injectable } from '@nestjs/common'
import { UserRepository } from '../repositories/user.repository'
import { UserEntity } from '../models/entities/user.entity'
import { AppErrorException } from '@common/exception/appError.exception'

interface IUserGetServiceInput {
	id?: number
	email?: string
}

@Injectable()
export class UserGetOneService {
	constructor(private userRepository: UserRepository) {
		//
	}
	async execute({ id, email }: IUserGetServiceInput): Promise<UserEntity> {
		if (id) return await this.userRepository.findById({ id })
		if (email)
			return await this.userRepository.findByEmail({
				email,
			})
		throw new AppErrorException({
			message: 'Metodo não implementado',
			errorCode: 'Internal-error',
		})
	}
}
