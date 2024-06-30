import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'

declare type FromResponse<TResponse> = TResponse
declare type FromRequest<TRequest> = TRequest

export type APIGatewayRequest<TRequest = string> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromRequest<TRequest> }

export type APIGatewayResponse<TResponse = string> = Omit<APIGatewayProxyResult, 'body'> & {
  body: FromResponse<TResponse>
}

export type APIGatewayProxyHandler<TRequest, TResponse> = Handler<
  APIGatewayRequest<TRequest>,
  APIGatewayResponse<TResponse>
>
