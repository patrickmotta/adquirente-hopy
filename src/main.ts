import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from '@modules/app.module'
import 'dotenv/config'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { projectName } from '@common/utils/projectName'
import * as fs from 'fs'
import * as path from 'path'

async function bootstrap(): Promise<void> {
	const httpsOptions = {
		key: fs.readFileSync(path.join(__dirname, '../certs/private.key')),
		cert: fs.readFileSync(path.join(__dirname, '../certs/certificate.crt')),
	}
	const app = await NestFactory.create(AppModule, { httpsOptions })

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	)

	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

	useContainer(app.select(AppModule), { fallbackOnErrors: true })

	const documentBuilderConfig = new DocumentBuilder()
		.setTitle(projectName)
		.setVersion('1.0')
		.build()
	const document = SwaggerModule.createDocument(app, documentBuilderConfig)

	SwaggerModule.setup('/swagger', app, document)

	await app.listen(process.env.SERVICE_PORT ?? 3000)
}
bootstrap()
