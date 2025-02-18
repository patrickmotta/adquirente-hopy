import * as path from 'path'

export const projectName = path.basename(process.cwd()).replaceAll('-', '_')
