# ThinkFlow API
Handles backend communications between ThinkFlow client and server.

## How to communicate with ThinkFlow API
### Running the server
Use this cmd on the backend server while running the frontend server
```
npm run dev
```

### Communicating with the server
Axios Documentation - *https://axios-http.com/docs/intro*

##### Create an instance of axios
Example:
```js
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/',
});
```

##### Use request methods with instance (get, post, put, delete)
Example:
```js
// Remember to put in async function
const getRes = await axiosInstance.get('/users');
console.log(getRes.data);

const postRes = await axiosInstance.post(
    '/notes/create', // route
    { // body data
        userId: "68d7ea6da1474eceea4328dc",
        title: "MY NOTES",
        description: "This is my notes"
    },
    { // options
        headers: {
            'Content-Type': 'application/json'
        }
    }
);
console.log(getRes.status);
```

##### Adding interceptor (For User Authetication)