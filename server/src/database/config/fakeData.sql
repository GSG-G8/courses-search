BEGIN;

INSERT INTO 
course(title,author_name,url,rate,reviews,description, source)
VALUES(
    'computer',
    'Moh',
    'www.course1.com',
    '3.4',
    '23 reviews',
    'Hi from computer course',
    'fkdsh'
),
(
    'Science',
    'Ralef',
    'www.course1.com',
    '4.4',
    '60 reviews',
    'Hi from Science course',
    'ehgfkdsf'
),
(
    'Phonetics',
    'Yaser',
    'www.course1.com',
    '5.4',
    '50 reviews',
    'Hi from Phonetics course',
    'vsfoijsglas'
),
(
    'Linguistics',
    'Moh',
    'www.course1.com',
    '1.3',
    '80 reviews',
    'Hi from Linguistics course',
    'vskjdghlsd'
);

COMMIT;