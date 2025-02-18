import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { HttpExceptionFilter } from '@common/v1/filters/httpException.filter'
import { RequestLogInterceptor } from '@common/v1/interceptors/logger/requestLog.interceptor'
import { dynamicImport } from '@common/utils/dynamicImport'

const modules = dynamicImport({
	dir: __dirname,
	extension: 'module',
})
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		...modules,
	],
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: RequestLogInterceptor,
		},
		{ provide: APP_FILTER, useClass: HttpExceptionFilter },
	],
})
export class AppModule {}
