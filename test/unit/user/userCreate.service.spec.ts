import { UserRepository } from '@modules/v1/user/repositories/user.repository'
import { UserCreateService } from '@modules/v1/user/services/userCreate.service'
import { Test, TestingModule } from '@nestjs/testing'
import { UserCreateDto } from '@modules/v1/user/models/dto/userCreate.dto'

describe('UserCreateService', () => {
	let userCreateservice: UserCreateService
	let userRepository: UserRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserCreateService,
				UserRepository,
				{
					provide: UserRepository,
					useValue: {
						create: jest.fn(),
					},
				},
			],
		}).compile()

		userCreateservice = module.get<UserCreateService>(UserCreateService)
		userRepository = module.get<UserRepository>(UserRepository)
	})

	it('Deve estar definido', () => {
		expect(userCreateservice).toBeDefined()
	})

	it('Deve criar um novo usuário', async () => {
		const userCreateDto: UserCreateDto = {
			name: 'Jose',
			document: '12312345678',
			email: 'jose@gmail.com',
			phone: '31984565554',
		}

		const result = await userCreateservice.execute(userCreateDto)

		expect(userRepository.create).toHaveBeenCalledWith(userCreateDto)
		expect(userRepository.create).toHaveBeenCalledTimes(1)

		expect(result).toEqual({ message: 'User created' })
	})
})
