'use strict'

const base = require('./api_base.js');

class ApiItemsCategories extends base {
    register(prefix, app) {
        base.logger('INFO', 'registering item/category endpoints');
        // collections
        app.get('/' + prefix + '/' + 'items_categories', this.get_list);
        // individual items
        app.post('/' + prefix + '/' + 'item_category', this.post_one);
        app.delete('/' + prefix + '/' + 'item_category/:id', this.delete_one);
    }

    // optional URL params: item_id, category_id
    get_list(req, res) { 
        var values = [];
        var sql    = 'SELECT i.name, c.name FROM items i, categories c, items_categories ic WHERE i.id = ic.item_id AND c.id = ic.category_id';
        if(req.query.item_id) {
            sql += ' AND i.id = $1';
            values.push(req.query.item_id);
        } 
        if(req.query.category_id) {
            var placeholder = req.query.item_id ? '$2' : '$1';
            sql += ' AND c.id = ' + placeholder;
            values.push(req.query.category_id);
        } 
        base.logger('DEBUG', sql);
        base.logger('DEBUG', values);
        base.run_query(sql, values, function(data) {
            res.json(data.rows);
        });
    }

    delete_one(req, res, id) { super.delete_one(req, res, 'items_categories', id); }

    post_one(req, res) {
        var sql    = "INSERT INTO items_categories(item_id, category_id) VALUES($1, $2) RETURNING id";
        var values = [req.body.item_id, req.body.category_id];
        base.run_query(sql, values, function(data) {
            if(data && data.rows) { 
                res.json({"item_category_id": data.rows[0].id});
            } else {
                res.json({"error": "true"});
            } 
        });
    }
}

module.exports = ApiItemsCategories;
