import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiBodyOptions,
  ApiOperation,
  ApiOperationOptions,
  ApiParam,
  ApiParamOptions,
  ApiResponse,
  ApiResponseOptions,
  ApiSecurity,
} from '@nestjs/swagger';

export const Swagger = (swaggerInfos: {
  apiKey?: any;
  bearerAuth?: any;
  body?: ApiBodyOptions;
  operations?: ApiOperationOptions;
  params?: ApiParamOptions;
  responses?: ApiResponseOptions[];
}) => {
  return applyDecorators(
    swaggerInfos.apiKey ? ApiSecurity(swaggerInfos.apiKey) : Swagger,
    swaggerInfos.bearerAuth ? ApiBearerAuth() : Swagger,
    swaggerInfos.body ? ApiBody(swaggerInfos.body) : Swagger,
    swaggerInfos.params ? ApiParam(swaggerInfos.params) : Swagger,
    ApiOperation(swaggerInfos.operations ?? {}),
    ...(swaggerInfos.responses ?? []).map((response) => ApiResponse(response)),
  );
};
