import * as fs from 'fs'
import * as path from 'path'
interface IInput {
	dir: string
	extension: string
	exclude?: string[]
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export function dynamicImport({ dir, extension, exclude }: IInput) {
	const modulesDir = path.join(dir)
	const subdirs = fs.readdirSync(modulesDir)
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const modules = []

	subdirs.forEach((subdir) => {
		const subdirPath = path.join(modulesDir, subdir)
		if (fs.statSync(subdirPath).isDirectory()) {
			const files = fs.readdirSync(subdirPath)

			files.forEach((file) => {
				if (
					file.endsWith(`.${extension}.js`) ||
					file.endsWith(`.${extension}.ts`)
				) {
					const modulePath = path.join(subdirPath, file)

					const filterFileName = file.split('.')[0]
					const extensionUpperCase =
						extension.charAt(0).toUpperCase() + extension.slice(1)

					const className =
						filterFileName.charAt(0).toUpperCase() +
						filterFileName.slice(1) +
						extensionUpperCase

					if (exclude?.includes(className)) {
						return
					}
					// eslint-disable-next-line @typescript-eslint/no-require-imports
					const moduleExports = require(modulePath)
					modules.push(moduleExports[className])
				}
			})
		}
	})
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return modules
}
