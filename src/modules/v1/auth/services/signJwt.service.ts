import { Inject, Injectable } from '@nestjs/common'
import jwtConfig from '../resources/config/jwt.config'
import { JwtService } from '@nestjs/jwt'
import { ConfigType } from '@nestjs/config'

interface ISignJwtServiceInput {
	sub: number
	expiresIn: number
	payload?: object
}

@Injectable()
export class SignJwtService {
	constructor(
		@Inject(jwtConfig.KEY)
		private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
		private readonly jwtService: JwtService,
	) {}
	async execute({
		sub,
		expiresIn,
		payload,
	}: ISignJwtServiceInput): Promise<string> {
		const token = await this.jwtService.signAsync(
			{
				sub: sub,
				...payload,
			},
			{
				audience: this.jwtConfiguration.audience,
				issuer: this.jwtConfiguration.issuer,
				secret: this.jwtConfiguration.secret,
				expiresIn,
			},
		)

		return token
	}
}
