import { environment, typeEnvironment } from '@common/utils/environment'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'

@Injectable()
export default class PGServiceConfigDatabase implements TypeOrmOptionsFactory {
	constructor(private configService: ConfigService) {}
	private DBHost = this.getEnv('PG_SERVICE_DB_HOST')
	private DBPort = this.getEnv('PG_SERVICE_DB_PORT')
	private DBUser = this.getEnv('PG_SERVICE_DB_USER')
	private DBPassword = this.getEnv('PG_SERVICE_DB_PASSWORD')
	private DBName = this.getEnv('PG_SERVICE_DB_NAME')
	private readonly syncronize =
		environment === typeEnvironment.dev ? true : false

	private getEnv(envName: string): string {
		const env =
			this.configService.get<string>(envName) ||
			this.throwMissingEnvError(envName)

		return env
	}

	private throwMissingEnvError(envName: string): never {
		throw new Error(`Missing env variable ${envName}`)
	}
	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			host: this.DBHost,
			port: parseInt(this.DBPort),
			username: this.DBUser,
			password: this.DBPassword,
			database: this.DBName,
			autoLoadEntities: true,
			synchronize: this.syncronize,
		}
	}
}
