import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import PGLogsConfigDatabase from '@modules/database/PGLog/config/PGLogs.config.database'
import { ErrorLogEntity } from '@modules/v1/log/models/entities/error.entity'
import { RequestLogEntity } from '@modules/v1/log/models/entities/request.entity'
import { SendLogEntity } from '@modules/v1/log/models/entities/send.entity'

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			name: 'PGLogs',
			useClass: PGLogsConfigDatabase,
			inject: [PGLogsConfigDatabase],
		}),

		TypeOrmModule.forFeature(
			[ErrorLogEntity, RequestLogEntity, SendLogEntity],
			'PGLogs',
		),
	],
	exports: [TypeOrmModule],
})
export class PGLogModule {}
