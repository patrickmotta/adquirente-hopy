import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from '@modules/app.module'
import 'dotenv/config'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { projectName } from '@common/utils/projectName'

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule)

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
