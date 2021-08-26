const base = require('./api_base.js');

class ApiItems extends base {
    constructor(dbh, app) {
        super(dbh, app);
    }

    register(prefix, app) {
        console.log('register items');
        app.get('/' + prefix + '/' + 'items', this.get_list);
        app.get('/' + prefix + '/' + 'items/:id', this.get_item);
        app.post('/' + prefix + '/' + 'item', this.post_item);
    }

    get_list(req, res) {
        super.run_query('SELECT * FROM items', null, function(data) {
            res.json(data);
        });
    }

    get_item(req, res, id) {
        super.run_query('SELECT * FROM items WHERE id = ?', req.params.id, function(data) {
            res.json(data);
        });
    }

    post_item(req, res) {
        var sql    = "INSERT INTO items(name) VALUES($1) RETURNING id";
        var values = [req.body.name];
        super.run_query(sql, values, function(data) {
//            res.json({"item_id": data.rows[0].id});
            res.json(1);
        });
    }
}

module.exports = ApiItems;
