BEGIN;

INSERT INTO course(category_id,title,image,author_name,url,rate,reviews,description, source)
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
    'www.course1.com',
    '4.4',
    '60 reviews',
    'Hi from Science course',
    'ehgfkdsf'
),
(   '3',
    'Phonetics',
    'Yaser',
    'www.course1.com',
    '5.4',
    '50 reviews',
    'Hi from Phonetics course',
    'vsfoijsglas'
),
(   
    '4',
    'Linguistics',
    'Moh',
    'www.course1.com',
    '1.3',
    '80 reviews',
    'Hi from Linguistics course',
    'vskjdghlsd'
);

COMMIT;

