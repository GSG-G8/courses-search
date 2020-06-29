INSERT INTO users (name , email) VALUES ('Mohammed', 'hamood-monzer11@hotmail.com'),  ('omar', 'omar@hotmail.com');

INSERT INTO course(category_id,title,author_name,url,rate,reviews,description, source)
VALUES(
    '1',
    'computer',
    'Moh',
    'www.course1.com',
    '3.4',
    '23 reviews',
    'Hi from computer course',
    'udemy'
),
(
    '2',
    'Science',
    'Ralef',
    'www.course2.com',
    '4.4',
    '60 reviews',
    'Hi from Science course',
    'udemy'
),
(   '3',
    'Phonetics',
    'Yaser',
    'www.course3.com',
    '5',
    '50 reviews',
    'Hi from Phonetics course',
    'udacity'
),
(   
    '4',
    'Linguistics',
    'Moh',
    'www.course4.com',
    '1.3',
    '80 reviews',
    'Hi from Linguistics course',
    'udacity'
);

INSERT INTO user_favorite_folders (title, user_id) VALUES ('user 1 fav folder 1', 1), ('user 1 fav folder 2', 1);

INSERT INTO favorite (user_id,course_id, folder_id) VALUES (1, 1, 1), (1, 2, 2);

INSERT INTO favorite (user_id,course_id) VALUES (2, 1);

INSERT INTO comment (content,user_id,course_id)
VALUES(
    'this is my first comment',
    '1',
    '1'
),
(
    'this is my secound comment',
    '1',
    '2'
),
(
    'this is my third comment',
    '1',
    '2'
),
(
    'comment from 2 user',
    '2',
    '1'
),
(
    'comment from 2 user again',
    '2',
    '1'
);
