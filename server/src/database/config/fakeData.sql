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
    'fkdsh'
),
(
    '2',
    'Science',
    'Ralef',
    'www.course2.com',
    '4.4',
    '60 reviews',
    'Hi from Science course',
    'ehgfkdsf'
),
(   '3',
    'Phonetics',
    'Yaser',
    'www.course3.com',
    '5.4',
    '50 reviews',
    'Hi from Phonetics course',
    'vsfoijsglas'
),
(   
    '4',
    'Linguistics',
    'Moh',
    'www.course4.com',
    '1.3',
    '80 reviews',
    'Hi from Linguistics course',
    'vskjdghlsd'
);

INSERT INTO favorite (user_id,course_id) VALUES (1, 1), (1, 2);