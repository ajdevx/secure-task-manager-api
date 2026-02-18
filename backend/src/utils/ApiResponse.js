class ApiResponse{
    constructor(statusCode, data, message="Success"){
        this.statusCode = statusCode
        this.message = message
        this.data = data
        this.success = statusCode < 400 // if status code less than 400 it is a success respose
    }
}
export {ApiResponse}