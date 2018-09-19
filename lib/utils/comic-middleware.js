const { getComicsList } = require('../services/comicsApi');

module.exports = function returnComicList(api = getComicsList) {
    return (req, res, next) => {
        return api(req.body)
            .then(data => {
                req.body = data;
                next();
            });
    };
};