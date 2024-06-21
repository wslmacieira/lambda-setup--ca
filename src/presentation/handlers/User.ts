import { User, UserSchema } from '@/domain/entities/User'
import { sendMessage } from '@/infrastructure/services/teste'
import { ValidatedAPIGatewayProxyEvent } from '@/interfaces/ApiGatewayProxyEvent'

export class UserHandler {
  constructor() {}

  handler: ValidatedAPIGatewayProxyEvent<UserSchema> = async (event) => {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    const user = new User(body)
    await new Promise((resolve) => setTimeout(resolve, 500))
    const message = sendMessage()
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      },
      body: JSON.stringify({
        message,
        user,
      }),
    }

    return response
  }
}
