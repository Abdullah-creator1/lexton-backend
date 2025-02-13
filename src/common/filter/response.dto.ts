export class ResponseDto<T> {
    success: boolean;
    message: string;
    exception?: any;
    data?: any;
  
    constructor(data?: any, message = '', exception?: any) {
      this.success = !!data && Object.keys(data).length > 0 && typeof data === "object";
      this.message = typeof data === "object" ? "" : data;
      this.exception = exception;
      this.data = typeof data === "object" ? data : "";
    }
  }
  