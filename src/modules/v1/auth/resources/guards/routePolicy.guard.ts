import {
	CanActivate,
	ExecutionContext,
	HttpStatus,
	Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { routePolicyKey } from '../constants/auth.constants'
import { IUserType } from '@modules/v1/user/resources/enums'
import { UserEntity } from '@modules/v1/user/models/entities/user.entity'
import { AppHttpErrorException } from '@common/exception/appHttpError.exception'

@Injectable()
export class RoutePolicyGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const routePolicyRequired = this.reflector.get<IUserType[] | undefined>(
			routePolicyKey,
			context.getHandler(),
		)

		if (!routePolicyKey) return true

		const request: Request = context.switchToHttp().getRequest()
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const user: UserEntity = (request as any).user

		// if (!routePolicyRequired.includes(user.role))
		// 	throw new AppHttpErrorException({
		// 		message: 'Usuário não possui permissão',
		// 		errorCode: 'USER_PERMISSION_UNAUTHORIZED',
		// 		statusCode: HttpStatus.UNAUTHORIZED,
		// 	})

		return true
	}
}
