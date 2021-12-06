/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
import * as musicRepository from '../repositories/music.repository.js';
import MusicError from '../errors/MusicError.js';

async function registerMusic(name, link) {
    if (!name || !link) {
        return null;
    }
    const linkValid = link.search('www.youtube');
    if (linkValid === -1) {
        return null;
    }

    const resul = await musicRepository.storeRecommendation(name, link);
    if (!resul) {
        throw new MusicError('Música já cadastrada');
    }

    return resul;
}

async function addVoteMusic(id) {
    const music = await musicRepository.getMusic(id);

    if (!music) {
        throw new MusicError('Essa música não existe');
    }

    const resul = await musicRepository.updateScore(music.name, music.score + 1);
    return resul;
}

async function removeVoteMusic(id) {
    const music = await musicRepository.getMusic(id);

    if (!music) {
        throw new MusicError('Essa música não existe');
    }

    const score = music.score - 1;

    if (score < -5) {
        const musicDelete = await musicRepository.deleteRecommendation(music.id);
        return musicDelete;
    }

    const resul = await musicRepository.updateScore(music.name, score);
    return resul;
}

async function randomSongs() {
    const musics = await musicRepository.getAllMusics();

    if (musics.length === 0) {
        throw new MusicError('Não há nenhuma música cadastrada');
    }

    const popularSongs = [];
    const unpopularSongs = [];
    for (let i = 0; i < musics.length; ++i) {
        if (musics[i].points > 10) {
            popularSongs.push(musics[i]);
        } else {
            unpopularSongs.push(musics[i]);
        }
    }

    if (popularSongs.length > 0 && unpopularSongs.length > 0) {
        const randomNumber = Math.random();
        if (randomNumber <= 0.3) {
            const randomIndex = Math.floor(Math.random() * unpopularSongs.length);
            return unpopularSongs[randomIndex];
        }

        const randomIndex = Math.floor(Math.random() * popularSongs.length);
        return popularSongs[randomIndex];
    }

    const index = Math.floor(Math.random() * musics.length);
    return musics[index];
}

async function topsSongs(amount) {
    const musics = await musicRepository.topMusics(parseInt(amount));

    if (musics.length === 0) {
        throw new MusicError('Não há musicas registradas');
    }

    return musics;
}

export {
    registerMusic,
    addVoteMusic,
    removeVoteMusic,
    randomSongs,
    topsSongs,
};
