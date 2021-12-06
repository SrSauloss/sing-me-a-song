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

export {
    registerMusic,
    addVoteMusic,
    removeVoteMusic,
};
