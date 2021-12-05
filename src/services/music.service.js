/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
import * as musicRepository from '../repositories/music.repository.js';
import MusicError from '../errors/MusicError.js';

async function registerMusic(name, link) {
    if (!name || !link) {
        return null;
    }

    const resul = await musicRepository.storeRecommendation(name, link);
    if (!resul) {
        throw new MusicError('Música já cadastrada');
    }

    return resul;
}

export {
    registerMusic,
};
