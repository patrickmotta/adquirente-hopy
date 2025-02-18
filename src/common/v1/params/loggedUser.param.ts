import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const LoggedUserParam = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const context = ctx.switchToHttp()
		const request = context.getRequest()
		return request['user']
	},
)
