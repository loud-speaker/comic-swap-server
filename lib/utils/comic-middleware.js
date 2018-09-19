const { getComicsList, getOneComicDetail } = require('../services/comicsApi');

function returnComicList(api = getComicsList) {
    return (req, res, next) => {
        return api(req.query)
            .then(data => {
                req.body = data;
                next();
            });
    };
}

function returnComicDetail(api = getOneComicDetail) {
    return (req, res, next) => {
        return api(req.query.id)
            .then(data => {
                req.body = data;
                next();
            });
    };
}

module.exports = {
    returnComicList,
    returnComicDetail
};