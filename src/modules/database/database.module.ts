import { Global, Module } from '@nestjs/common'
import { dynamicImport } from '@common/utils/dynamicImport'

const DBModules = dynamicImport({
	dir: __dirname,
	extension: 'module',
})
@Global()
@Module({
	imports: [...DBModules],
	exports: [...DBModules],
})
export class DatabaseModule {}
