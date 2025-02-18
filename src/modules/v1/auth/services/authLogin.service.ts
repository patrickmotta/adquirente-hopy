import { AppHttpErrorException } from '@common/exception/appHttpError.exception'
import { UserGetOneService } from '@modules/v1/user/services/userGetOne.service'
import { HttpStatus, Injectable } from '@nestjs/common'
import { GenerateTokensService } from './generateTokens.service'
import { HashingService } from '@modules/v1/auth/resources/interfaces/hashing.interface'

interface IAuthLoginServiceInput {
	email: string
	password: string
}

interface IAuthLoginServiceOutput {
	acessToken: string
	refreshToken: string
}

@Injectable()
export class AuthLoginService {
	constructor(
		private readonly userGetOneService: UserGetOneService,
		private readonly hashingService: HashingService,
		private readonly generateTokens: GenerateTokensService,
	) {}

	async execute({
		email,
		password,
	}: IAuthLoginServiceInput): Promise<IAuthLoginServiceOutput> {
		let throwError = true
		const user = await this.userGetOneService.execute({
			email,
		})

		if (!user) {
			throw new AppHttpErrorException({
				message: 'Email ou senha invalido',
				errorCode: 'LOGIN_ERROR',
				statusCode: HttpStatus.UNAUTHORIZED,
			})
		}

		if (!user.active) {
			throw new AppHttpErrorException({
				message: 'Usuário sem permissão para logar',
				errorCode: 'LOGIN_UNAUTHORIZED',
				statusCode: HttpStatus.UNAUTHORIZED,
			})
		}

		const passwordIsValid = await this.hashingService.compare({
			password,
			passwordHash: user?.password,
		})

		throwError = passwordIsValid ? false : true

		if (throwError) {
			throw new AppHttpErrorException({
				message: 'Email ou senha invalido',
				errorCode: 'LOGIN_ERROR',
				statusCode: HttpStatus.UNAUTHORIZED,
			})
		}

		const { acess, refresh } = await this.generateTokens.execute({
			sub: user.id,
			payload: { email: user.email },
		})

		return {
			acessToken: acess,
			refreshToken: refresh,
		}
	}
}
