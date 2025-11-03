# ThinkFlow API
Handles backend communications between ThinkFlow client and server.

## How to communicate with ThinkFlow API
### Running the server
Use this cmd on the backend server while running the frontend server
```
npm run dev
```

### Communicating with the server
Create an instance of axios

Example:
```
const axiosInstance = axios.create();
```

Use request methods with instance (get, post, put, delete)

Example:
```
const res = axiosInstance.get('/api/some-route', );
```