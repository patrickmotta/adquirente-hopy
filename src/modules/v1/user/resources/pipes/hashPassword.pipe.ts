import { Injectable, PipeTransform } from '@nestjs/common'
import { BcryptService } from '@modules/v1/auth/services/bcrypt.service'

interface IData {
	password: string
}

@Injectable()
export class HashPassworPipe implements PipeTransform {
	constructor(private bcryptService: BcryptService) {}
	async transform(value: IData): Promise<unknown> {
		const password = value?.password
		const { passwordHash } = await this.bcryptService.hash({ password })
		value.password = passwordHash

		return value
	}
}
