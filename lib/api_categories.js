'use strict'

const base = require('./api_base.js');

class ApiCategories extends base {
    register(prefix, app) {
        base.logger('INFO', 'registering item category endpoints');
        // category collections
        app.get('/' + prefix + '/' + 'categories', this.get_list);
        // individual catgories
        app.get('/' + prefix + '/' + 'category/:id', this.get_one);
        app.post('/' + prefix + '/' + 'category', this.post_one);
        app.delete('/' + prefix + '/' + 'category/:id', this.delete_one);
    }

    get_list(req, res) { super.get_list(req, res, 'categories'); }

    get_one(req, res, id) { super.get_one(req, res, 'categories', id); }

    delete_one(req, res, id) { super.delete_one(req, res, 'categories', id); }

    post_one(req, res) {
        var sql    = "INSERT INTO categories (name) VALUES($1) RETURNING id";
        var values = [req.body.name];
        base.run_query(sql, values, function(data) {
            if(data && data.rows) {
                res.json({"category_id": data.rows[0].id});
            } else {
                res.json({"error": "true"});
            }
        });
    }
}

module.exports = ApiCategories;
