import { Module } from '@nestjs/common'

import { dynamicImport } from '@common/utils/dynamicImport'
import { WebhookController } from './webhook.controller'
import { TransactionModule } from '../transaction/transaction.module'

const services = dynamicImport({
	dir: __dirname,
	extension: 'service',
})

@Module({
	imports: [TransactionModule],
	controllers: [WebhookController],
	providers: [...services],
	exports: [...services],
})
export class WebhookModule {}
