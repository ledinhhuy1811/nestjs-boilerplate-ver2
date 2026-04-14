import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOperationOptions,
  ApiParam,
  ApiParamOptions,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';

export const Swagger = (swaggerInfos: {
  operations?: ApiOperationOptions;
  params?: ApiParamOptions;
  responses?: ApiResponseOptions[];
}) => {
  return applyDecorators(
    ApiOperation(swaggerInfos.operations ?? {}),
    swaggerInfos.params ? ApiParam(swaggerInfos.params) : Swagger,
    ...(swaggerInfos.responses ?? []).map((response) => ApiResponse(response)),
  );
};
