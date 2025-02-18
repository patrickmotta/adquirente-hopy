import { HttpException, HttpStatus } from '@nestjs/common'

interface IInput {
	message: string
	errorCode: string
	internalMessage?: string | string[] | object | unknown
}

export class AppErrorException extends HttpException {
	public readonly errorCode: string
	public readonly internalMessage:
		| string
		| string[]
		| object
		| undefined
		| unknown

	constructor({ message, errorCode, internalMessage }: IInput) {
		super({ message, errorCode }, HttpStatus.INTERNAL_SERVER_ERROR)
		this.errorCode = errorCode
		this.internalMessage = internalMessage
	}
}
