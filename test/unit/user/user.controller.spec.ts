import { UserController } from '@modules/v1/user/user.controller'
import { UserEntity } from '@modules/v1/user/models/entities/user.entity'
import { UserCreateDto } from '@modules/v1/user/models/dto/userCreate.dto'

describe('UserController', () => {
	let userController: UserController

	// Mockando os serviços necessários
	const userCreateServiceMock = {
		execute: jest.fn(),
	}
	const userGetOneServiceMock = {
		execute: jest.fn(),
	}
	const userGetAllServiceMock = {
		execute: jest.fn(),
	}
	const userUpdateServiceMock = {
		execute: jest.fn(),
	}

	beforeEach(() => {
		userController = new UserController(
			userCreateServiceMock as never,
			userGetOneServiceMock as never,
			userGetAllServiceMock as never,
			userUpdateServiceMock as never,
		)
	})

	it('UserController deve ser definido', () => {
		expect(userController).toBeDefined()
	})

	describe('FindAll', () => {
		it('Deve chamar userGetAllService.execute e retornar todos os usuários', async () => {
			const usersMock: UserEntity[] = [
				{
					name: 'Jose',
					email: 'jose@email',
					document: '123456',
					phone: '3140028922',
				},
			]

			userGetAllServiceMock.execute.mockResolvedValue(usersMock)

			const result = await userController.findAll()

			expect(userGetAllServiceMock.execute).toHaveBeenCalledTimes(1)
			expect(result).toEqual(usersMock)
		})
	})

	describe('Create', () => {
		it('Deve chamar userCreateService.execute e criar um usuário', async () => {
			const mockResponse = { message: 'User created' }
			const userDto: UserCreateDto = {
				name: 'Jose',
				email: 'jose@email',
				document: '123456',
				phone: '3140028922',
			}
			userCreateServiceMock.execute.mockResolvedValue(mockResponse)
			const result = await userController.create(userDto)

			expect(userCreateServiceMock.execute).toHaveBeenCalledWith(userDto)
			expect(userCreateServiceMock.execute).toHaveBeenCalledTimes(1)
			expect(result).toEqual(mockResponse)
		})
	})
})
