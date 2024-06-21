import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'

export declare type FromEntity<S> = S
type ValidatedAPIGatewayBodyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromEntity<S> }
export type ValidatedAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayBodyEvent<S>, APIGatewayProxyResult>
