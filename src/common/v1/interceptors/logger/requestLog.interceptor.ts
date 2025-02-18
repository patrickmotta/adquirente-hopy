import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { Observable, tap } from 'rxjs'
import { RequestLogService } from '@modules/v1/log/services/requestLog.service'

@Injectable()
export class RequestLogInterceptor implements NestInterceptor {
	constructor(private requestLogService: RequestLogService) {}
	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const timeExecute = Date.now()
		const contextHttp = context.switchToHttp()
		const request = contextHttp.getRequest<Request>()
		const response = contextHttp.getResponse<Response>()

		const { path, method, body, params, query } = request

		const { statusCode } = response

		return next.handle().pipe(
			tap((data) => {
				const timeExecuteRoute = Date.now() - timeExecute
				this.requestLogService.store({
					method,
					path,
					request: { body, params, query },
					response: data || {},
					status: statusCode,
					time: String(timeExecuteRoute),
				})
			}),
		)
	}
}
