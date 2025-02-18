import { AppHttpErrorException } from '@common/exception/appHttpError.exception'
import {
	CanActivate,
	ExecutionContext,
	HttpStatus,
	Inject,
	Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import jwtConfig from '../config/jwt.config'
import { ConfigType } from '@nestjs/config'
import { UserGetOneService } from '@modules/v1/user/services/userGetOne.service'

@Injectable()
export class AuthTokenGuard implements CanActivate {
	constructor(
		private readonly JwtService: JwtService,
		@Inject(jwtConfig.KEY)
		private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
		private readonly UserGetOneService: UserGetOneService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request = context.switchToHttp().getRequest()
		const token = this.extractToken(request)

		if (!token) {
			throw new AppHttpErrorException({
				message: 'Usuário Não logado',
				errorCode: 'UNAUTHORIZED_REQUEST',
				statusCode: HttpStatus.UNAUTHORIZED,
			})
		}

		try {
			const payload = await this.JwtService.verifyAsync(
				token,
				this.jwtConfiguration,
			)

			const user = await this.UserGetOneService.execute({
				id: payload.sub,
			})

			if (!user.active)
				throw new AppHttpErrorException({
					message: 'Usuário não autorizado',
					errorCode: 'USER_UNAUTHORIZED',
					statusCode: HttpStatus.UNAUTHORIZED,
				})
			request['user'] = user
		} catch (error) {
			const err = error as { message: string }
			throw new AppHttpErrorException({
				message:
					err.message === 'jwt expired'
						? 'Token expirado, realize o login novamente.'
						: 'Falha ao verificar token',
				errorCode: 'UNAUTHORIZED_REQUEST',
				statusCode: HttpStatus.UNAUTHORIZED,
				internalMessage: err.message,
			})
		}

		return true
	}

	extractToken(request: Request): string | undefined {
		const authorization = request.headers.authorization

		if (!authorization || typeof authorization !== 'string') {
			return
		}

		return authorization.split(' ')[1]
	}
}
