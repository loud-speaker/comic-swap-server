const { getComicsList, getOneComicDetail } = require('../services/comicsApi');

function returnComicList(api = getComicsList) {
    return (req, res, next) => {
        return api(req.params)
            .then(data => {
                console.log('REQ.BODY', req.body);
                req.body = data;
                console.log('COMIC LIST MIDDLEWARE:', req.body);
                next();
            });
    };
}

function returnComicDetail(api = getOneComicDetail) {
    return (req, res, next) => {
        // console.log('COMIC DETAIL MIDDLEWARE:');
        return api(req.params.id)
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