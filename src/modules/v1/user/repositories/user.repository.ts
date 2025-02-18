import { Injectable } from '@nestjs/common'
import { UserCreateDto } from '../models/dto/userCreate.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../models/entities/user.entity'
import { Repository } from 'typeorm'
import { AppErrorException } from '@common/exception/appError.exception'
import { UserUpdateDto } from '../models/dto/userUpdate.dto'
import { AppHttpErrorException } from '@common/exception/appHttpError.exception'

interface IFindByIdInput {
	id: number
}

interface IFindByEmailtInput {
	email: string
}

@Injectable()
export class UserRepository {
	constructor(
		@InjectRepository(UserEntity, 'PGService')
		private readonly userRepository: Repository<UserEntity>,
	) {}
	async create(userCreateDto: UserCreateDto): Promise<void> {
		try {
			await this.userRepository.save(userCreateDto)
		} catch (error) {
			const dbError = error as { message: string }
			throw new AppErrorException({
				message: 'Falha ao criar usuário.',
				errorCode: 'ERROR_CREATE_USER',
				internalMessage: dbError.message,
			})
		}
	}
	async findAll(): Promise<UserEntity[]> {
		try {
			const DBUsers = await this.userRepository.find()
			return DBUsers
		} catch (error) {
			const dbError = error as { message: string }
			throw new AppErrorException({
				message: 'Falha ao buscar todos usuários.',
				errorCode: 'ERROR_GET_ALL_USERS',
				internalMessage: dbError.message,
			})
		}
	}

	async findById({ id }: IFindByIdInput): Promise<UserEntity> {
		try {
			const DBUser = await this.userRepository.findOne({
				where: {
					id,
				},
			})

			if (!DBUser)
				throw new AppHttpErrorException({
					message: 'Usuário não encontrado',
					errorCode: 'PG_USER_NOT_FOUND',
					statusCode: 400,
				})

			return DBUser
		} catch (error) {
			if (error instanceof AppHttpErrorException) throw error

			const dbError = error as { message: string }

			throw new AppErrorException({
				message: 'Falha ao buscar usuário.',
				errorCode: 'ERROR_GET_USER',
				internalMessage: dbError.message,
			})
		}
	}

	async findByEmail({ email }: IFindByEmailtInput): Promise<UserEntity> {
		try {
			const DBUser = await this.userRepository.findOne({
				where: {
					email,
				},
			})
			if (!DBUser)
				throw new AppHttpErrorException({
					message: 'Usuário não encontrado',
					errorCode: 'PG_USER_NOT_FOUND',
					statusCode: 400,
				})
			return DBUser
		} catch (error) {
			if (error instanceof AppHttpErrorException) throw error

			const dbError = error as { message: string }
			throw new AppErrorException({
				message: 'Falha ao buscar usuário.',
				errorCode: 'ERROR_GET_USER',
				internalMessage: dbError.message,
			})
		}
	}

	async update(userUpdate: UserUpdateDto): Promise<void> {
		try {
			await this.userRepository.save(userUpdate)
		} catch (error) {
			const dbError = error as { message: string }

			throw new AppErrorException({
				message: 'Falha ao atualizar usuário',
				errorCode: 'ERROR_UPDATE_USER',
				internalMessage: dbError.message,
			})
		}
	}
}
