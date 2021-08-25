DROP TABLE IF EXISTS items_categories;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS items;

CREATE TABLE items (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE categories (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE items_categories (
    item_id INTEGER NOT NULL REFERENCES items(id),
    category_id INTEGER NOT NULL REFERENCES categories(id)
);

ALTER TABLE items_categories ADD CONSTRAINT items_categories_unique UNIQUE (item_id, category_id);
