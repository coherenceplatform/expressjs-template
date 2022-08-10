const express = require('express');
const api = require("./src/controller/apis");
const app = express();
const port = process.env.PORT;
 
app.use(express.json());
 
// url - http://localhost:10091/
app.get('/', api.index);
 
// url - http://localhost:10091/health
app.get('/health', api.health);
 
// url - http://localhost:10091/users
app.get('/users', api.getUsers);
 
// url - http://localhost:10091/users/2
app.get('/users/:id', api.getUserById);
 
// url - http://localhost:10091/users
// sample request body
/* 
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@gupshup.com",
    "gender": "F",
    "phone": "860-861-4604"
}
*/
app.post('/users', api.save);
 
// url - http://localhost:10091/users/10
app.delete('/users/:id', api.deleteUser)
 
// url - http://localhost:10091/users/10
// sample request body
/* 
{
    "firstName": "Radhe Shyam",
    "lastName": "Tiwari",
    "email": "radhe-shyam.tiwari@gupshup.com",
    "gender": "M",
    "phone": "727-213-8139"
}
*/
app.put('/users/:id', api.updateUser);
 
app.listen(port, () => {
    console.log(`Application listening on port ${port}`)
});

