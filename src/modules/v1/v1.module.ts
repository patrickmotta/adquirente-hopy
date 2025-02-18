import { Module } from '@nestjs/common'

import { dynamicImport } from '@common/utils/dynamicImport'

const v1Modules = dynamicImport({
	dir: __dirname,
	extension: 'module',
})

@Module({
	imports: [...v1Modules],
	exports: [...v1Modules],
})
export class V1Module {}
