'use strict'

const base = require('./api_base.js');

class ApiItems extends base {
    register(prefix, app) {
        console.log('register items');
        app.get('/' + prefix + '/' + 'items', this.get_list);
        app.get('/' + prefix + '/' + 'item/:id', this.get_one);
        app.post('/' + prefix + '/' + 'item', this.post_one);
        app.delete('/' + prefix + '/' + 'item/:id', this.delete_one);
    }

    get_list(req, res) { super.get_list(req, res, 'items'); }

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
