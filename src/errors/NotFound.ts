export class NotFound extends Error {
  constructor(entityType = '', identifier: string | number = '') {
    const identifierInfo = identifier ? ` with identifier "${identifier}"` : '';
    super(`Failed to find ${entityType}${identifierInfo}.`);
    this.name = 'NotFoundError';
  }
}
