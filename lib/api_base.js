const {Client} = require('pg');

class ApiBase {
    static run_query(sql, values, callback) {
        // TODO: dont reconnect every time, but this does "work"
        const settings = require('../db.js');
        const dbh      = new Client(settings);
        dbh.connect();
        dbh.query(sql, values, (error, result) => {
            if (error) {
                callback(result);
                ApiBase.logger('ERROR', error.stack)
            } else {
                callback(result);
            }
        });
    }

    get_list(req, res, table) {
        ApiBase.run_query('SELECT * FROM ' + table, [], function(data) {
            res.json(data.rows);
        });
    }

    // specifically called "get one" instead of "get item" to avoid ambiguitity with 
    // the "items" API
    get_one(req, res, table, id) {
        ApiBase.run_query('SELECT * FROM ' + table + ' WHERE id = $1', [req.params.id], function(data) {
            var response = data.rows.length > 0 ? data.rows[0] : 'item not found';
            res.json(response);
        });
    }

    delete_one(req, res, table, id) {
        ApiBase.run_query('DELETE FROM ' + table + ' WHERE id = $1', [req.params.id], function(data) {
            res.json({'id': req.params.id});
        });
    }

    delete_list(req, res, table, id) {
        ApiBase.run_query('DELETE FROM ' + table + '', [], function(data) {
            res.json({'error': 'false'});
        });
    }

    default_routes(app) {
        app.get('*',    function (req, res) { res.status(404).json({'error': 'not found'}); });
        app.post('*',   function (req, res) { res.status(404).json({'error': 'not found'}); });
        app.put('*',    function (req, res) { res.status(404).json({'error': 'not found'}); });
        app.delete('*', function (req, res) { res.status(404).json({'error': 'not found'}); });
    }

    static logger(level, message) {
        var ts        = Math.floor(Date.now() / 1000);
        // pad out INFO so the lines are aligned
        var formatted = "["+level+"] "  + (level == 'INFO' ? ' ' : '') + ts + ': ' + message;
        console.log(formatted);
    }
}

module.exports = ApiBase;
