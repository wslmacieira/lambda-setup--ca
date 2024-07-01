import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'

export interface ApiHandler {
  execute(event?: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult>
}
