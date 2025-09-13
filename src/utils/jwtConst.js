export const jwtCookieOptions = {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: true
}

export function formatJwtUserData(user)
{
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        password: user.password
    }
}