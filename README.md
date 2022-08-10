# ExpressJS-api Template

This is a template to get started building on Coherence (withcoherence.com)

## To use

- Sign up for an account at app.withcoherence.com
- Import this template into a new repo
- Follow the onboarding steps on the Coherence site to set up your Cloud IDE, automatic preview environments, CI/CD pipelines, and managed cloud infrastructure

## API endpoints

GET:
main: http://<url>/
health: http://<url>/health
list of users: http://<url>/users
get info from user 1: http://<url>/users/1
 
POST:
add user: http://<url>/users
sample request body:
{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@somedomain.com",
    "gender": "F",
    "phone": "555-222-4321"
}
 
DELETE:
delete user 5: http://<url>/users/5
 
PUT:
update user 4: http://<url>/users/2
sample request body:
{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@somedomain.com",
    "gender": "F",
    "phone": "555-333-4321"
}

## To connect to the database from the toolbox

- Run the toolbox from the Coherence UI
- Run a terminal in the toolbox
- Use cocli to run commands in the running instance. Example:

To dump a database:

```console
cocli exec backend 'DB_SOCKET_NAME=$(compgen -A variable | grep _SOCKET) && PGPASSWORD="$DB_PASSWORD" pg_dump -h ${!DB_SOCKET_NAME} -U $DB_USER $DB_NAME'
```

To run the psql cli:

```console
cocli exec backend 'DB_SOCKET_NAME=$(compgen -A variable | grep _SOCKET) && PGPASSWORD="$DB_PASSWORD" psql -h ${!DB_SOCKET_NAME} -U $DB_USER $DB_NAME'
Going to run command (backend): [DB_SOCKET_NAME=$(compgen -A variable | grep _SOCKET) && PGPASSWORD="$DB_PASSWORD" psql -h ${!DB_SOCKET_NAME} -U $DB_USER $DB_NAME]
psql (13.7 (Debian 13.7-1.pgdg100+1))
Type "help" for help.

main=> \l
                                                List of databases
     Name      |       Owner       | Encoding |  Collate   |   Ctype    |            Access privileges            
---------------+-------------------+----------+------------+------------+-----------------------------------------
 cloudsqladmin | cloudsqladmin     | UTF8     | en_US.UTF8 | en_US.UTF8 | 
 main          | cloudsqlsuperuser | UTF8     | en_US.UTF8 | en_US.UTF8 | 
 postgres      | cloudsqlsuperuser | UTF8     | en_US.UTF8 | en_US.UTF8 | 
 template0     | cloudsqladmin     | UTF8     | en_US.UTF8 | en_US.UTF8 | =c/cloudsqladmin                       +
               |                   |          |            |            | cloudsqladmin=CTc/cloudsqladmin
 template1     | cloudsqlsuperuser | UTF8     | en_US.UTF8 | en_US.UTF8 | =c/cloudsqlsuperuser                   +
               |                   |          |            |            | cloudsqlsuperuser=CTc/cloudsqlsuperuser
(5 rows)

main=>
main=> select * from users;
 id | first_name | last_name |       email       | gender |    phone     
----+------------+-----------+-------------------+--------+--------------
  1 | John       | Doe       | jdoe@nodomain.com | F      | 555-111-1234
(1 row)

main=>
```

## To connect to the database from the workspace

- Launch the workspace from the Coherence UI
- Run a terminal in the toolbox
- Use cocli to run commands in the running instance. Example:

To dump a database:

```console
cocli exec backend 'DB_PORT=$(compgen -A variable | grep _DB1_PORT) && PGPASSWORD="$DB_PASSWORD" pg_dump -h localhost -p ${!DB_PORT} -U $DB_USER $DB_NAME'
```

To run the psql cli:

```console
cocli exec backend 'DB_PORT=$(compgen -A variable | grep _DB1_PORT) && PGPASSWORD="$DB_PASSWORD" psql -h localhost -p ${!DB_PORT} -U $DB_USER $DB_NAME'
Going to run command (backend): [DB_SOCKET_NAME=$(compgen -A variable | grep _SOCKET) && PGPASSWORD="$DB_PASSWORD" psql -h ${!DB_SOCKET_NAME} -U $DB_USER $DB_NAME]
psql (13.7 (Debian 13.7-1.pgdg100+1))
Type "help" for help.

coherence=# \l
                                  List of databases
   Name    |   Owner   | Encoding |  Collate   |   Ctype    |    Access privileges    
-----------+-----------+----------+------------+------------+-------------------------
 coherence | coherence | UTF8     | en_US.utf8 | en_US.utf8 | 
 postgres  | coherence | UTF8     | en_US.utf8 | en_US.utf8 | 
 template0 | coherence | UTF8     | en_US.utf8 | en_US.utf8 | =c/coherence           +
           |           |          |            |            | coherence=CTc/coherence
 template1 | coherence | UTF8     | en_US.utf8 | en_US.utf8 | =c/coherence           +
           |           |          |            |            | coherence=CTc/coherence
(4 rows)

coherence=# select * from users;
 id | first_name | last_name |       email       | gender |    phone     
----+------------+-----------+-------------------+--------+--------------
  1 | John       | Doe       | jdoe@nodomain.com | F      | 555-111-1234
(1 row)

main=>
```

