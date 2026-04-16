import { applyDecorators } from '@nestjs/common';
import {
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
  body?: ApiBodyOptions;
  operations?: ApiOperationOptions;
  params?: ApiParamOptions;
  responses?: ApiResponseOptions[];
}) => {
  return applyDecorators(
    swaggerInfos.apiKey ? ApiSecurity(swaggerInfos.apiKey) : Swagger,
    swaggerInfos.body ? ApiBody(swaggerInfos.body) : Swagger,
    swaggerInfos.params ? ApiParam(swaggerInfos.params) : Swagger,
    ApiOperation(swaggerInfos.operations ?? {}),
    ...(swaggerInfos.responses ?? []).map((response) => ApiResponse(response)),
  );
};
