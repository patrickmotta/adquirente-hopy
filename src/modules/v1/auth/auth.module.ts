import { Global, Module } from '@nestjs/common'
import { HashingService } from '@modules/v1/auth/resources/interfaces/hashing.interface'
import { BcryptService } from './services/bcrypt.service'
import { AuthController } from './auth.controller'
import { dynamicImport } from '@common/utils/dynamicImport'
import { UserModule } from '@modules/v1/user/user.module'
import { ConfigModule } from '@nestjs/config'
import jwtConfig from './resources/config/jwt.config'
import { JwtModule } from '@nestjs/jwt'

const services = dynamicImport({
	dir: __dirname,
	extension: 'service',
	exclude: ['BcryptService'],
})

@Global()
@Module({
	imports: [
		UserModule,
		ConfigModule.forFeature(jwtConfig),
		JwtModule.registerAsync(jwtConfig.asProvider()),
	],
	providers: [
		{
			provide: HashingService,
			useClass: BcryptService,
		},
		...services,
	],
	exports: [HashingService, JwtModule, ConfigModule],
	controllers: [AuthController],
})
export class AuthModule {}
