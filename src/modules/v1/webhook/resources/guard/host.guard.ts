import {
	CanActivate,
	ExecutionContext,
	Injectable,
	ForbiddenException,
} from '@nestjs/common'

@Injectable()
export class HostGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest()
		const hostHeader = request.headers.host
		const allowedHost = process.env.HOPY_HOST

		if (hostHeader !== allowedHost) {
			throw new ForbiddenException('Acesso negado: Host não autorizado')
		}

		return true
	}
}
