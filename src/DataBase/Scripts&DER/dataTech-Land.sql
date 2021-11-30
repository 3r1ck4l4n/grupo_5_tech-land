USE
TECH_LAND;

/* filling  categories table with fake data*/

INSERT INTO categories
VALUES (1, 'Destacados', 'Lorem ipsum'),
       (2, 'Agregados recientemente', 'Lorem ipsum'),
       (3, 'Más vendidos', 'Lorem ipsum'),
       (4, 'En oferta', 'Lorem ipsum');


/* filling brand table with fake data */

INSERT INTO brands
VALUES (1, 'Acer', 'lorem ipsum'),
       (2, 'Adata', 'lorem ipsum'),
       (3, 'Alienware', 'lorem ipsum'),
       (4, 'AMD', 'lorem ipsum'),
       (5, 'Aorus', 'lorem ipsum'),
       (6, 'Apple', 'lorem ipsum'),
       (7, 'Asus', 'lorem ipsum'),
       (8, 'Dell', 'lorem ipsum'),
       (9, 'EVGA', 'lorem ipsum'),
       (10, 'Gigabyte', 'lorem ipsum'),
       (11, 'HP', 'lorem ipsum'),
       (12, 'Huawei', 'lorem ipsum'),
       (13, 'HyperX', 'lorem ipsum'),
       (14, 'Intel', 'lorem ipsum'),
       (15, 'Lenovo', 'lorem ipsum'),
       (16, 'MSI', 'lorem ipsum'),
       (17, 'Nvidia', 'lorem ipsum'),
       (18, 'Samsung', 'lorem ipsum'),
       (19, 'Sony', 'lorem ipsum'),
       (20, 'Otro', 'lorem ipsum');

/* filling type-component table with fake data */

INSERT INTO type_component
VALUES
    (1, 'Perifericos', 'lorem ipsum'),
    (2, 'Equipos de Computo', 'lorem ipsum'),
    (3, 'Laptops', 'lorem ipsum'),
    (4, 'Monitores', 'lorem ipsum'),
    (5, 'Procesadores', 'lorem ipsum'),
    (6, 'Tarjetas Madre', 'lorem ipsum'),
    (7, 'Tarjetas de Video', 'lorem ipsum'),
    (8, 'Disipadores y Enfriamiento', 'lorem ipsum'),
    (9, 'PC Gamer', 'lorem ipsum'),
    (10, 'Almacenamiento', 'lorem ipsum'),
    (11, 'Memorias', 'lorem ipsum'),
    (12, 'Otro', 'lorem ipsum');

/* filling customer table with fake data */

INSERT INTO customers
VALUES (1, 'ldodding0@usda.gov', 'JT463qtS', 'Lazaro Dodding', '605 Boyd Plaza',
        'http://dummyimage.com/133x100.png/cc0000/ffffff', '608-787-7079', 'Indonesia'),
       (2, 'tsmithers1@cpanel.net', 'k62GvaDeLy', 'Theresina Smithers', '12 Coleman Court',
        'http://dummyimage.com/249x100.png/ff4444/ffffff', '281-615-7777', 'Poland'),
       (3, 'cjarred2@nifty.com', 'fecZm3bT1qjM', 'Carlie Jarred', '84567 Red Cloud Center',
        'http://dummyimage.com/248x100.png/ff4444/ffffff', '554-552-8766', 'Russia'),
       (4, 'cbenezeit3@wordpress.org', 'cGtJh0S', 'Cherise Benezeit', '82 Pearson Point',
        'http://dummyimage.com/100x100.png/dddddd/000000', '363-229-6814', 'Philippines'),
       (5, 'sbrittain4@slashdot.org', 'cJlDAair', 'Smitty Brittain', '688 Farragut Street',
        'http://dummyimage.com/220x100.png/5fa2dd/ffffff', '801-771-6851', 'Guatemala'),
       (6, 'dgiorgioni5@liveinternet.ru', 'rGxOoOG', 'Dianemarie Giorgioni', '82701 Dwight Avenue',
        'http://dummyimage.com/212x100.png/ff4444/ffffff', '319-908-4755', 'China'),
       (7, 'tgodding6@chicagotribune.com', 'DesJMi55', 'Trudey Godding', '09803 Talisman Circle',
        'http://dummyimage.com/148x100.png/5fa2dd/ffffff', '236-475-2038', 'Philippines'),
       (8, 'flabb7@linkedin.com', 'r4UB3VTW5pHF', 'Fayina Labb', '09933 Glacier Hill Pass',
        'http://dummyimage.com/240x100.png/5fa2dd/ffffff', '365-349-1457', 'Mexico'),
       (9, 'grosendahl8@about.com', '8ldoPlY0r', 'Gigi Rosendahl', '9 Roxbury Crossing',
        'http://dummyimage.com/229x100.png/dddddd/000000', '520-772-8659', 'Malawi'),
       (10, 'sdabrowski9@mapy.cz', 'WxK56iB', 'Steward Dabrowski', '21040 Columbus Hill',
        'http://dummyimage.com/100x100.png/ff4444/ffffff', '673-139-4109', 'China');

/* filling admin table with fake data */

INSERT INTO admins
VALUES (1, 'isra@mail.com', 'Israel Pérez', '$2b$10$MKrRP4kPe3cfkwGV4YGgyeRl/s7SC.JZI3Ha1fcOAhDJii47ZgCZa',
        '/profileImages/isra@mail.comprofile-image.jpg', 1234567890);


/* filling product table with fake data */
INSERT INTO products
VALUES (1, 'Tableta Grafica Digital de Dibujo', 'lorem ipsum', 5, 1, '/images/home/product-image-1631982879253.jpg',
        '21640.07', NULL, NULL, 1),
       (2, 'Disco Duro Externo', 'lorem ipsum', 5, 1, '/images/home/product-image-1631982979466.jpg', '21640.07', NULL,
        NULL, 2),
       (3, 'Fuente de poder', 'lorem ipsum', 5, 1, '/images/home/product-image-1631983119545.jpg', '21640.07', NULL,
        NULL, 3),
       (4, 'Monitor de 23.8', 'lorem ipsum', 5, 1, '/images/home/product-image-1631983454670.jpg', '21640.07', NULL,
        NULL, 4),
       (5, 'Web camera', 'lorem ipsum', 5, 1, '/images/home/product-image-1631983363574.jpg', '21640.07', NULL, NULL,
        5);


/* filling pivot tables */

/* product-categories */

INSERT INTO product_categories
VALUES
    (1, 1),
    (2, 1),
    (4, 2),
    (1, 3),
    (4, 4),
    (1, 5),
    (4, 5);

/* product-type_component*/

INSERT INTO product_type_component
VALUES
    (1, 1),
    (10, 2),
    (8, 3),
    (4, 4),
    (1, 5);


/* order */

INSERT INTO orders
VALUES (1, 1, 1000, '605 Boyd Plaza', '605 Boyd Plaza', 'ldodding0@usda.gov', '2021-11-13', 'enviado');


/* order_detail */

INSERT INTO order_detail
VALUES (1, 1, 1, '21640.07', 1, '21640.07');


/* product-admin */

INSERT INTO product_admin
VALUES
    (1, 1, 1, '2021-11-13', 'added');

INSERT INTO REVIEWS
VALUES (1,1,'ESTE PRODUCTO ESTA COOL', 5);




select * from products;

delete from type_component
