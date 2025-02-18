import { Inject, Injectable } from '@nestjs/common'
import { SignJwtService } from './signJwt.service'
import jwtConfig from '../resources/config/jwt.config'
import { ConfigType } from '@nestjs/config'

interface IGenerateTokensServiceInput {
	sub: number
	payload?: object
}

interface IGenerateTokensServiceOutput {
	acess: string
	refresh: string
}

@Injectable()
export class GenerateTokensService {
	constructor(
		@Inject(jwtConfig.KEY)
		private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
		private readonly signJwt: SignJwtService,
	) {}

	async execute({
		sub,
		payload,
	}: IGenerateTokensServiceInput): Promise<IGenerateTokensServiceOutput> {
		const acessTokenPromise = this.signJwt.execute({
			sub,
			expiresIn: this.jwtConfiguration.ttl,
			payload,
		})

		const refreshTokenPromise = this.signJwt.execute({
			sub,
			expiresIn: this.jwtConfiguration.refreshTtl,
		})

		const [acess, refresh] = await Promise.all([
			acessTokenPromise,
			refreshTokenPromise,
		])

		return {
			acess,
			refresh,
		}
	}
}
