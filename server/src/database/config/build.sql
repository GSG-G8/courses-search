BEGIN;

DROP TABLE IF EXISTS course , category , comment , favorite, users CASCADE;

CREATE TABLE users (
	id SERIAL PRIMARY KEY ,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL
);

CREATE TABLE category (
	id SERIAL PRIMARY KEY ,
	name VARCHAR(255) NOT NULL,
	original_id VARCHAR(255) NOT NULL
);
CREATE TABLE course (
	id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES category(id),
	title VARCHAR(255) NOT NULL,
	image VARCHAR(255) NOT NULL DEFAULT 'https://uniweb.qwebbuilder.com.ng/images/onlinecourses.jpg' ,
	author_name VARCHAR(255) NOT NULL DEFAULT 'no author',
    url VARCHAR(255) NOT NULL ,
    rate VARCHAR(255) NOT NULL DEFAULT 'no rate',
    reviews VARCHAR(255) NOT NULL DEFAULT 'no reviews',
    description VARCHAR(255) NOT NULL,
    source VARCHAR(255) NOT NULL
    
);


CREATE TABLE comment (
	id SERIAL PRIMARY KEY ,
	TEXT VARCHAR(255) NOT NULL,
	user_id INTEGER NOT NULL REFERENCES users(id),
	course_id INTEGER NOT NULL REFERENCES course(id)
);
CREATE TABLE favorite (
	user_id INTEGER NOT NULL REFERENCES users(id),
	course_id INTEGER NOT NULL REFERENCES course(id),
    PRIMARY KEY (user_id, course_id) 
);


COMMIT;