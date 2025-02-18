import { HttpException, HttpStatus } from '@nestjs/common'

interface IInput {
	message: string
	statusCode: HttpStatus
	errorCode: string
	internalMessage?: string | string[] | object
}

export class AppHttpErrorException extends HttpException {
	public readonly errorCode: string
	public readonly internalMessage: string | string[] | object | undefined

	constructor({ message, statusCode, errorCode, internalMessage }: IInput) {
		super({ message, errorCode }, statusCode)
		this.internalMessage = internalMessage
		this.errorCode = errorCode
	}
}
