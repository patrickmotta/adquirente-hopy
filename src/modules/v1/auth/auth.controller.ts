import { Body, Controller, Post } from '@nestjs/common'
import { AuthLoginService } from './services/authLogin.service'
import { LoginDto } from './models/dto/login.dto'
import { RefreshTokenDto } from './models/dto/refreshToken.dto'
import { RefreshTokenService } from './services/refreshToken.service'

@Controller('v1/auth')
export class AuthController {
	constructor(
		private readonly authLoginService: AuthLoginService,
		private readonly refreshTokenService: RefreshTokenService,
	) {}
	@Post()
	async login(@Body() loginDto: LoginDto): Promise<object> {
		return this.authLoginService.execute(loginDto)
	}

	@Post('refresh')
	async refreshToken(@Body() refreshToken: RefreshTokenDto): Promise<object> {
		return this.refreshTokenService.execute(refreshToken)
	}
}
