// importing module
const { Pool } = require('pg');

// db configuration
const dbuser = process.env.DB_USER
const dbpass = process.env.DB_PASSWORD
const dbname = process.env.DB_NAME
const dbhost = process.env.DB_HOST
var dbsocket = ""
var dbendpoint = ""
var dbport = ""

for (const [key, value] of Object.entries(process.env)) {
	// console.log(key, value);
	if (key.endsWith("DB1_SOCKET")) {
		dbsocket = value
	}
	if (key.endsWith("DB1_ENDPOINT")) {
		dbendpoint = value
	}
	if (key.endsWith("DB1_PORT")) {
		dbport = value
	}
}

pool = new Pool()

pool.options['host'] = ""
pool.options['port'] = dbport
pool.options['user'] = dbuser
pool.options['password'] = dbpass
pool.options['database'] = dbname
pool.options['ssl'] = false

if (process.env.COHERENCE_DEV == "true") {
	if (dbhost != "") {
		pool.options['host'] = dbhost 
	} else {
		pool.options['host'] = 'localhost'
	}
} else {
	if (dbendpoint != "") {
		pool.options['host'] = dbendpoint 
	} else {
		pool.options['host'] = dbsocket
	}
}
 
//console.log(pool);

// basic endpoint
 
const index = (request, response) => {
    response.status(200).json({ info: 'Application started successfully' });
};
 
// health check endpoint
 
const health = (request, response) => {
    pool.query('SELECT NOW()', (err, results) => {
        error(err, response);
        response.status(200).json({ info: 'Database is up and running' });
    });
};
 
// application endpoints
 
// get all users
const getUsers = (request, response) => {
    console.log('Getting all users');
    pool.query('SELECT * FROM users', (err, results) => {
        error(err, response);
        response.status(200).json({ info: results.rows });
    });
};
 
// get user by id
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
    console.log('Get user id = ' + id);
    pool.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
        error(err, response);
        response.status(200).json({ info: results.rows });
    });
};
 
// save new user
const save = (request, response) => {
    console.log('Saving new user');
    const { firstName, lastName, email, gender, phone } = request.body
    pool.query('INSERT INTO users (first_name, last_name, email, gender, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [firstName, lastName, email, gender, phone], (err, results) => {
            error(err, response);
            response.setHeader('created_id', `${results.rows[0].id}`);
            response.status(201).json({ info: 'Resource created successfully' });
        });
};
 
// delete user by id
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);
    console.log('Delete user id = ' + id);
    pool.query('DELETE FROM users WHERE id = $1', [id], (err, results) => {
        error(err, response);
        if (results.rowCount == 0)
            response.status(400).json({ info: 'Resource not found' });
        else
            response.status(200).json({ info: `Resource deleted with id: ${id}` });
    });
};
 
// update user by id
// db part skipped for brevity. you are free to play around
const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    console.log('Update user id = ' + id);
    response.status(204).json({ info: `Resource updated with id: ${id}` });
};
 
// helper method
function error(err, response) {
    if (err) {
        // console.log(err);
        response.status(503).json({ info: 'Some internal server error occurred' });
    }
}
 
module.exports = {
    index,
    health,
    getUsers,
    getUserById,
    save,
    deleteUser,
    updateUser
};
