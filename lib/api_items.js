'use strict'

const base = require('./api_base.js');

class ApiItems extends base {
    register(prefix, app) {
        base.logger('INFO', 'registering item/items endpoints');
        // item collections
        app.get('/' + prefix + '/' + 'items', this.get_list);
        app.post('/' + prefix + '/' + 'items', this.post_list);
        app.delete('/' + prefix + '/' + 'items', this.delete_list);
        // individual items
        app.get('/' + prefix + '/' + 'item/:id', this.get_one);
        app.post('/' + prefix + '/' + 'item', this.post_one);
        app.delete('/' + prefix + '/' + 'item/:id', this.delete_one);
    }

    get_list(req, res) { super.get_list(req, res, 'items'); }

    delete_list(req, res, id) { super.delete_list(req, res, 'items'); }
    
    post_list(req, res) {
        var sql = 'INSERT INTO items(name) VALUES ';

        var items  = [];
        var values = [];
        req.body.forEach(function(item, index) { 
            items.push('($' + (index + 1) + ')');
            values.push(item.name);
        });
        sql += items.join(',');

        sql += ' RETURNING id';
        base.logger('DEBUG', sql);

        base.run_query(sql, values, function(data) {
            var output = [];
            data.rows.forEach(function(item) {
                output.push(item.id);
            });
            res.json({"item_id": output});
        });
    }

    get_one(req, res, id) { super.get_one(req, res, 'items', id); }

    delete_one(req, res, id) { super.delete_one(req, res, 'items', id); }

    post_one(req, res) {
        var sql    = "INSERT INTO items(name) VALUES($1) RETURNING id";
        var values = [req.body.name];
        base.run_query(sql, values, function(data) {
            res.json({"item_id": data.rows[0].id});
        });
    }
}

module.exports = ApiItems;
