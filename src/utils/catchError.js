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
    let message = err.message;
    if(err.name){
        switch(err.name){
            case "CastError":
                message = 'Invalid ID!';
                break;
            case "ValidationError":
                message = err.message;
                break;
        }
    }
    if(err.code){
        switch(err.code){
            case 11000:
                message = checkKeyValue(err.keyValue);
                break;
            case "ENOENT":
                message = "Path doesn't esists!";
                break;
        }
    }
    return { error: message };
}

export default catchError;