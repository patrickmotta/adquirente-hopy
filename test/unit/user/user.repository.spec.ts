import { Repository } from 'typeorm'
import { UserRepository } from '@modules/v1/user/repositories/user.repository'
import { UserEntity } from '@modules/v1/user/models/entities/user.entity'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserCreateDto } from '@modules/v1/user/models/dto/userCreate.dto'
import { AppErrorException } from '@common/exception/appError.exception'
import { AppHttpErrorException } from '@common/exception/appHttpError.exception'
import { UpdateUserDto } from '@modules/v1/user/models/dto/updateUser.dto'

describe('UserRepository', () => {
	let userRepository: UserRepository
	let typeormRepository: Repository<UserEntity>

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserRepository,
				{
					provide: getRepositoryToken(UserEntity, 'PGService'),
					useValue: {
						save: jest.fn(),
						findOne: jest.fn(),
						find: jest.fn(),
					},
				},
			],
		}).compile()

		userRepository = module.get<UserRepository>(UserRepository)
		typeormRepository = module.get<Repository<UserEntity>>(
			getRepositoryToken(UserEntity, 'PGService'),
		)
	})

	it('Deve estar definido', () => {
		expect(userRepository).toBeDefined()
	})

	describe('Create', () => {
		it('Deve criar um novo usuário', async () => {
			const userCreateDto: UserCreateDto = {
				name: 'Jose',
				document: '12312345678',
				email: 'jose@gmail.com',
				phone: '31984565554',
			}
			await userRepository.create(userCreateDto)

			expect(typeormRepository.save).toHaveBeenCalledWith(userCreateDto)
			expect(typeormRepository.save).toHaveBeenCalledTimes(1)
		})

		it('Deve lançar um erro de banco de dados', async () => {
			const userCreateDto: UserCreateDto = {
				name: 'Jose',
				document: '12312345678',
				email: 'jose@gmail.com',
				phone: '31984565554',
			}

			jest
				.spyOn(typeormRepository, 'save')
				.mockRejectedValue(new Error('Erro generico de banco de dados'))

			await expect(userRepository.create(userCreateDto)).rejects.toThrow(
				AppErrorException,
			)

			expect(typeormRepository.save).toHaveBeenCalledWith(userCreateDto)
			expect(typeormRepository.save).toHaveBeenCalledTimes(1)
		})
	})

	describe('FindByEmail', () => {
		const userEmail = 'jose@email.com'

		it('Deve retornar um usuário, se ele existir', async () => {
			const user: UserEntity = {
				id: 1,
				document: '2312121212',
				email: 'jose@email.com',
				name: 'jose',
				phone: '31666548985',
			}

			jest.spyOn(typeormRepository, 'findOne').mockResolvedValue(user)

			const DBUser = await userRepository.findByEmail({ email: userEmail })

			expect(typeormRepository.findOne).toHaveBeenCalledWith({
				where: {
					email: userEmail,
				},
			})
			expect(typeormRepository.findOne).toHaveBeenCalledTimes(1)

			expect(DBUser).toEqual(user)
		})

		it('Deve retornar que o usuário não foi encontrado', async () => {
			jest.spyOn(typeormRepository, 'findOne').mockResolvedValue(null)

			await expect(
				userRepository.findByEmail({ email: userEmail }),
			).rejects.toThrow(AppHttpErrorException)

			expect(typeormRepository.findOne).toHaveBeenCalledWith({
				where: {
					email: userEmail,
				},
			})
			expect(typeormRepository.findOne).toHaveBeenCalledTimes(1)
		})

		it('Deve lançar um erro de banco de dados', async () => {
			jest
				.spyOn(typeormRepository, 'findOne')
				.mockRejectedValue(new Error('Erro generico de banco de dados'))

			await expect(
				userRepository.findByEmail({ email: userEmail }),
			).rejects.toThrow(AppErrorException)

			expect(typeormRepository.findOne).toHaveBeenCalledWith({
				where: {
					email: userEmail,
				},
			})
			expect(typeormRepository.findOne).toHaveBeenCalledTimes(1)
		})
	})

	describe('FindAll', () => {
		it('Deve retornar todos os usuários', async () => {
			const users: UserEntity[] = [
				{
					id: 1,
					document: '2312121212',
					email: 'jose@email.com',
					name: 'jose',
					phone: '31666548985',
				},
				{
					id: 2,
					document: '36545857892',
					email: 'maria@email.com',
					name: 'maria',
					phone: '31666548985',
				},
			]

			jest.spyOn(typeormRepository, 'find').mockResolvedValue(users)

			const DBUsers = await userRepository.findAll()
			expect(typeormRepository.find).toHaveBeenCalled()
			expect(typeormRepository.find).toHaveBeenCalledTimes(1)

			expect(DBUsers).toEqual(users)
		})

		it('Deve lançar um erro de banco de dados', async () => {
			jest
				.spyOn(typeormRepository, 'find')
				.mockRejectedValue(new Error('Erro generico de banco de dados'))

			await expect(userRepository.findAll()).rejects.toThrow(AppErrorException)

			expect(typeormRepository.find).toHaveBeenCalled()
			expect(typeormRepository.find).toHaveBeenCalledTimes(1)
		})
	})

	describe('FindByDocument', () => {
		const user: UserEntity = {
			id: 1,
			document: '2312121212',
			email: 'jose@email.com',
			name: 'jose',
			phone: '31666548985',
		}
		it('Deve retornar um usuário', async () => {
			jest.spyOn(typeormRepository, 'findOne').mockResolvedValue(user)

			const DBUser = await userRepository.findByDocument({
				document: user.document,
			})

			expect(typeormRepository.findOne).toHaveBeenCalledWith({
				where: {
					document: user.document,
				},
			})
			expect(typeormRepository.findOne).toHaveBeenCalledTimes(1)

			expect(DBUser).toEqual(user)
		})

		it('Deve retornar que o usuário não foi encontrado', async () => {
			jest.spyOn(typeormRepository, 'findOne').mockResolvedValue(null)

			await expect(
				userRepository.findByDocument({ document: user.document }),
			).rejects.toThrow(AppHttpErrorException)

			expect(typeormRepository.findOne).toHaveBeenCalledWith({
				where: {
					document: user.document,
				},
			})
			expect(typeormRepository.findOne).toHaveBeenCalledTimes(1)
		})

		it('Deve lançar um erro de banco de dados', async () => {
			jest
				.spyOn(typeormRepository, 'findOne')
				.mockRejectedValue(new Error('Erro generico de banco de dados'))

			await expect(
				userRepository.findByDocument({ document: user.document }),
			).rejects.toThrow(AppErrorException)
		})
	})

	describe('FindById', () => {
		const userId = 1
		const user: UserEntity = {
			id: 1,
			document: '2312121212',
			email: 'jose@email.com',
			name: 'jose',
			phone: '31666548985',
		}
		it('Deve retornar um usuário', async () => {
			jest.spyOn(typeormRepository, 'findOne').mockResolvedValue(user)

			const DBUser = await userRepository.findById({
				id: userId,
			})

			expect(typeormRepository.findOne).toHaveBeenCalledWith({
				where: {
					id: userId,
				},
			})
			expect(typeormRepository.findOne).toHaveBeenCalledTimes(1)

			expect(DBUser).toEqual(user)
		})

		it('Deve retornar que o usuário não foi encontrado', async () => {
			jest.spyOn(typeormRepository, 'findOne').mockResolvedValue(null)

			await expect(userRepository.findById({ id: userId })).rejects.toThrow(
				AppHttpErrorException,
			)

			expect(typeormRepository.findOne).toHaveBeenCalledWith({
				where: {
					id: userId,
				},
			})
			expect(typeormRepository.findOne).toHaveBeenCalledTimes(1)
		})

		it('Deve lançar um erro de banco de dados', async () => {
			jest
				.spyOn(typeormRepository, 'findOne')
				.mockRejectedValue(new Error('Erro generico de banco de dados'))

			await expect(userRepository.findById({ id: userId })).rejects.toThrow(
				AppErrorException,
			)
		})
	})

	describe('Update', () => {
		const updateUseDto: UpdateUserDto = {
			name: 'joao',
			email: 'joao@email.com',
		}

		const user: UserEntity = {
			id: 1,
			document: '2312121212',
			email: 'jose@email.com',
			name: 'jose',
			phone: '31666548985',
		}

		it('Deve atualizar o usuário', async () => {
			Object.assign(user, updateUseDto)
			await userRepository.update(user)

			expect(typeormRepository.save).toHaveBeenCalledWith(user)
			expect(typeormRepository.save).toHaveBeenCalledTimes(1)
		})

		it('Deve lançar um erro de banco de dados', async () => {
			jest
				.spyOn(typeormRepository, 'save')
				.mockRejectedValue(new Error('Erro generico de banco de dados'))

			Object.assign(user, updateUseDto)

			await expect(userRepository.update(user)).rejects.toThrow(
				AppErrorException,
			)
		})
	})
})
