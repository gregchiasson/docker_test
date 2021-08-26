class ApiBase {
    constructor(dbh, app) {
        this.dbh       = dbh;
        this.log_level = 'DEBUG';
    }

    // TODO database
    run_query(sql, values, callback) {
        callback([1,2, values]);
    }

    default_routes(app) {
        app.get('*',    function (req, res) { res.status(404).json({'error': 'not found'}); });
        app.post('*',   function (req, res) { res.status(404).json({'error': 'not found'}); });
        app.put('*',    function (req, res) { res.status(404).json({'error': 'not found'}); });
        app.delete('*', function (req, res) { res.status(404).json({'error': 'not found'}); });
    }

    logger(level, message) {
        var ts        = Math.floor(Date.now() / 1000);
        // pad out INFO so the lines are aligned
        var formatted = "["+level+"] "  + (level == 'INFO' ? ' ' : '') + ts + ': ' + message;
        console.log(formatted);
    }
}

module.exports = ApiBase;
