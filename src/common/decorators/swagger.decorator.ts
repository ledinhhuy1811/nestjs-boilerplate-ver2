import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiBodyOptions,
  ApiOperation,
  ApiOperationOptions,
  ApiParam,
  ApiParamOptions,
  ApiQuery,
  ApiQueryOptions,
  ApiResponse,
  ApiResponseOptions,
  ApiSecurity,
} from '@nestjs/swagger';

export const Swagger = (swaggerInfos: {
  apiKey?: any;
  bearerAuth?: any;
  operations?: ApiOperationOptions;
  body?: ApiBodyOptions;
  query?: ApiQueryOptions;
  params?: ApiParamOptions;
  responses?: ApiResponseOptions[];
}) => {
  return applyDecorators(
    swaggerInfos.apiKey ? ApiSecurity(swaggerInfos.apiKey) : Swagger,
    swaggerInfos.bearerAuth ? ApiBearerAuth() : Swagger,
    swaggerInfos.body ? ApiBody(swaggerInfos.body) : Swagger,
    swaggerInfos.query ? ApiQuery(swaggerInfos.query) : Swagger,
    swaggerInfos.params ? ApiParam(swaggerInfos.params) : Swagger,
    ApiOperation(swaggerInfos.operations ?? {}),
    ...(swaggerInfos.responses ?? []).map((response) => ApiResponse(response)),
  );
};
