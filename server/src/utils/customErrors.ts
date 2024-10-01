export class CustomError extends Error {
    statusCode: number; 

    constructor(message: string, statusCode: number){
       super(message)
       this.statusCode = statusCode; 
       Error.captureStackTrace(this, this.constructor); 
    }
}; 

export class UnauthorizedError extends CustomError {
    constructor(message = 'Unauthorized'){
        super(message, 401); 
    }
}; 

export class NotFoundError extends CustomError {
    constructor(message = 'Not Found'){
        super(message, 404); 
    }
}; 

export class BadRequestError extends CustomError {
    constructor(message = 'Bad Request'){
        super(message, 400); 
    }
}; 

export class InternalServerError extends CustomError {
    constructor(message = 'Internal Server Error') {
      super(message, 500);
    }
  }



