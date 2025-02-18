import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@modules/app.module'
import { UserCreateDto } from '@modules/v1/user/models/dto/userCreate.dto'

describe('AppController (e2e)', () => {
	let app: INestApplication

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = module.createNestApplication()

		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				forbidNonWhitelisted: true,
				transform: true,
			}),
		)

		await app.init()
	})

	describe('/user (POST)', () => {
		it('Deve criar um usuário com sucesso', async () => {
			const createUseDto: UserCreateDto = {
				document: '8887845658',
				email: 'teste@teste.com',
				name: 'teste teste',
				phone: '32991674400',
			}
			const response = await request(app.getHttpServer())
				.post('/v1/user')
				.send(createUseDto)
				.expect(HttpStatus.CREATED)

			expect(response.body).toEqual({ message: 'User created' })
		})
	})
})
