import { Global, Module } from '@nestjs/common'
import { dynamicImport } from '@common/utils/dynamicImport'

const services = dynamicImport({
	dir: __dirname,
	extension: 'service',
})

const repositories = dynamicImport({
	dir: __dirname,
	extension: 'repository',
})

@Global()
@Module({
	imports: [],
	providers: [...services, ...repositories],
	exports: [...services],
})
export class LogModule {}
