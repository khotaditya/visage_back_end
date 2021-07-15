# back-end



## Project setup

## Installation via NPM:
```
$ npm install
```

### Database setup
### Create DB
```
CREATE DATABASE visage
```
### Create tables
```
CREATE TABLE candidate
(
    id uuid DEFAULT uuid_generate_v4(),
    first_name character varying COLLATE pg_catalog."default" NOT NULL,
    last_name character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    job_title character varying COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL,
    cv_id integer
);

CREATE TABLE cv
(
    id integer NOT NULL DEFAULT nextval('cv_id_seq'::regclass),
    filename text COLLATE pg_catalog."default",
    attachment bytea NOT NULL,
    created_at timestamp without time zone NOT NULL,
    CONSTRAINT cv_pkey PRIMARY KEY (id)
);

```
### Add .env file with followind details
```
NODE_ENV=development
DB_USER=<db_user>
DB_HOST=<db_host>
DB_DATABASE=<db_name>
DB_PASSWORD=<db_pass>
DB_PORT=5432
```

### Compiles and hot-reloads for development
```
$ node app.js
```