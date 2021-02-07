CREATE TABLE clothes (id SERIAL PRIMARY KEY NOT NULL, code TEXT UNIQUE, manufacturer_id INT, image_filename TEXT, short_description TEXT, description_more TEXT, promo BOOLEAN);

CREATE TABLE manufacturer (id SERIAL PRIMARY KEY NOT NULL, manufacturer_name TEXT NOT NULL, country VARCHAR(3), photo_link TEXT, description_short TEXT, more_description TEXT);

CREATE TABLE orders (id SERIAL PRIMARY KEY NOT NULL, order_date DATE, cloth_id INT UNIQUE, quantity INT, customer_code VARCHAR(10) UNIQUE);

