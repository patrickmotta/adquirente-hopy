import { Module } from '@nestjs/common'

import { dynamicImport } from '@common/utils/dynamicImport'
import { HttpModule } from '@nestjs/axios'
import { HopyRepository } from './repositories/hopy.repository'

const services = dynamicImport({
	dir: __dirname,
	extension: 'service',
})

@Module({
	imports: [
		HttpModule.registerAsync({
			useFactory: () => ({
				baseURL: process.env.HOPY_HOST,
				headers: {
					authorization:
						'Basic ' +
						Buffer.from(`${process.env.HOPY_SECRET_KEY}:x`).toString('base64'),
					'Content-Type': 'application/json',
				},
			}),
		}),
	],
	providers: [...services, HopyRepository],
	exports: [HttpModule, ...services],
})
export class HopyModule {}
