function catchError(err)
{
    let message = err.message;
    if(err.name){
        switch(err.name){
            case "ValidationError":
            case "CastError":
                message = 'Invalid ID!';
                break;
        }
    }
    if(err.code){
        switch(err.code){
            case 11000:
                message = 'Cannot have duplicate emails!';
                break;
            case "ENOENT":
                message = "Path doesn't esists!";
                break;
        }
    }
    return { error: message };
}

export default catchError;