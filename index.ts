import { sendHello } from '@/infrastructure/services/teste'

export async function handler(event: unknown) {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const name = 'wagner'

  const hello = sendHello()
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      hello,
      name,
      input: event,
    }),
  }

  return response
}
