require('dotenv').config();
const request = require('superagent');

const COMICS_API_KEY = process.env.COMICS_API_KEY;
const COMICS_URL = 'https://comicvine.gamespot.com/api/issues';
const COMIC_URL = 'https://comicvine.gamespot.com/api/issue';

const getComics = (params) => `${COMICS_URL}/?api_key=${COMICS_API_KEY}&limit=${params.limit}&filter=name:${params.keyword},cover_date:${params.dateStart}|${params.dateEnd}&field_list=id,name,cover_date,image&format=json`;
const getOneComic = comicId => `${COMIC_URL}/4000-${comicId}/?api_key=${COMICS_API_KEY}&field_list=id,image,character_credits,cover_date,name,volume,person_credits,description&format=json`;

const getComicsList = (params) => {
    return get(getComics(params))
        .then(data => {
            return processComicListData(data.results);
        });

    function processComicListData(data) {
        return data.map(comic => comic = {
            comicId: comic.id,
            name: comic.name || 'No Title',
            image: comic.image.medium_url,
            coverDate: comic.cover_date
        });
    }
};

const getOneComicDetail = (comicId) => {
    return get(getOneComic(comicId))
        .then(data => {
            return processComicDetailData(data.results);
        });

    function processComicDetailData(data) {
        return {
            comicId: data.id,
            issueName: data.name,
            volumeName: data.volume.name,
            coverDate: data.cover_date,
            description: data.description,
            image: data.image.medium_url,
            characters: data.character_credits.map(character => character.name),
            personCredits: data.person_credits.map(person => person = {
                name: person.name,
                role: person.role
            })
        };
    }
};


const get = url => request.get(url).then(res => res.body);

module.exports = {
    getComicsList,
    getOneComicDetail
};