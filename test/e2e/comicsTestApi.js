require('dotenv').config();
const request = require('superagent');

const COMICS_API_KEY = process.env.COMICS_API_KEY;
const COMICS_URL = 'https://comicvine.gamespot.com/api/issues';

const getComics = () => `${COMICS_URL}/?api_key=${COMICS_API_KEY}&limit=2&field_list=id,name,cover_date,image&format=json`;
// const getComics = () => 'https://comicvine.gamespot.com/api/issues/?api_key=bb83095ea509e9a9681a3a5312255b62aba64dbf&format=json';


const getComicsList = () => {
    
    return get(getComics())
        .then(data => {
            return processComicListData(data.results);
        });

    function processComicListData(data) {
        return data.map(comic => comic = {
            id: comic.id,
            name: comic.name,
            image: comic.image.medium_url,
            coverDate: comic.cover_date
        });
    }
};

// function processComicData(data) {
//     return {
//         id
//         issueName:
//         volumeName:
//         coverDate:
//         description:
//         image:
//         characters:
//         personCredits:
//     };
// }

const get = url => request.get(url).then(res => res.body);

module.exports = {
    getComicsList
};