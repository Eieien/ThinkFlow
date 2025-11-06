function checkKeyValue(keyValue)
{
    let message;
    if(keyValue.email){
        message = 'Cannot have duplicate emails!';
    } else {
        message = 'Duplicate entry found!';
    }
    return message;
}

function catchError(err)
{
    console.error(err);
    let message;
    try {
        err = JSON.parse(err);
        message = err.message;
    } catch (error) {
        message = err.message;
    }
    if(err?.name){
        switch(err.name){
            case "CastError":
                message = 'Empty/Invalid ID!';
                break;
            case "ValidationError":
                const key = Object.keys(err.errors)[0];
                message = err.errors[key].message;
                break;
        }
    }
    if(err?.code){
        switch(err.code){
            case 11000:
                message = checkKeyValue(err.keyValue); break;
            case "ENOENT":
                message = "Path doesn't esist!"; break;
            case "ERR_INVALID_ARG_TYPE":
                message = "Path is undefined!"; break;
        }
    }
    return { message: message };
}

export default catchError;