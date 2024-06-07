import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ExceptionFilter } from './exception-filter.interface';
import { Component } from '../../../types';
import { Logger } from '../../logger';
import { ValidationError } from '../errors';
import { createErrorObject } from '../../../helpers';
import { ApplicationError } from '../types/application-error.enum';

@injectable()
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register ValidationExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (! (error instanceof ValidationError)) {
      return next(error);
    }

    this.logger.error(`[ValidationException]: ${error.message}`, error);

    error.details.forEach(
      (errorField) => this.logger.warn(`[${errorField.property}] — ${errorField.messages}`)
    );

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(ApplicationError.ValidationError, error.message, error.details));
  }
}
