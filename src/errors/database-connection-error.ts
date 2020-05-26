import { CustomError } from "./custom-error"

class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Could not connect to database';
    constructor() {
        super('error connecting to Db');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }

}