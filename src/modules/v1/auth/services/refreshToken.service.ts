import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import { RefreshTokenDto } from '../models/dto/refreshToken.dto'
import jwtConfig from '../resources/config/jwt.config'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { AppHttpErrorException } from '@common/exception/appHttpError.exception'
import { UserGetOneService } from '@modules/v1/user/services/userGetOne.service'

import { GenerateTokensService } from './generateTokens.service'

@Injectable()
export class RefreshTokenService {
	constructor(
		@Inject(jwtConfig.KEY)
		private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
		private readonly jwtService: JwtService,
		private readonly userGetOneService: UserGetOneService,
		private readonly generateTokens: GenerateTokensService,
	) {}

	async execute({ refreshToken }: RefreshTokenDto): Promise<object> {
		try {
			const { sub } = await this.jwtService.verifyAsync(
				refreshToken,
				this.jwtConfiguration,
			)

			const user = await this.userGetOneService.execute({
				id: sub,
			})

			if (!user.active)
				throw new AppHttpErrorException({
					message: 'Usuário sem permissão para logar',
					errorCode: 'LOGIN_UNAUTHORIZED',
					statusCode: HttpStatus.UNAUTHORIZED,
				})

			const { acess, refresh } = await this.generateTokens.execute({
				sub: user.id,
				payload: {
					email: user.email,
				},
			})
			return {
				acessToken: acess,
				refreshToken: refresh,
			}
		} catch (error) {
			if (error instanceof AppHttpErrorException) throw error

			const err = error as { message: string }
			throw new AppHttpErrorException({
				message: 'Token invalido',
				errorCode: 'REFRESH_ERROR',
				statusCode: HttpStatus.UNAUTHORIZED,
				internalMessage: err.message,
			})
		}
	}
}
