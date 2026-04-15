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
} from '@nestjs/swagger';

export const Swagger = (swaggerInfos: {
  body?: ApiBodyOptions;
  operations?: ApiOperationOptions;
  params?: ApiParamOptions;
  responses?: ApiResponseOptions[];
}) => {
  return applyDecorators(
    swaggerInfos.body ? ApiBody(swaggerInfos.body) : Swagger,
    swaggerInfos.params ? ApiParam(swaggerInfos.params) : Swagger,
    ApiOperation(swaggerInfos.operations ?? {}),
    ...(swaggerInfos.responses ?? []).map((response) => ApiResponse(response)),
  );
};
