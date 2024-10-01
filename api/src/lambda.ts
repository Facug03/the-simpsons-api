import { Callback, Context, Handler } from 'aws-lambda'
import { bootstrap } from './main'

let server: Handler

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  server = server ?? (await bootstrap())
  return server(event, context, callback)
}
