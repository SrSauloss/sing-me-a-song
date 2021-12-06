/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
import { musicSchema } from '../validations/schemas.js';
import * as musicService from '../services/music.service.js';

async function storeMusic(req, res, next) {
    const { name, youtubeLink } = req.body;

    if (musicSchema.validate({ name, youtubeLink }).error) {
        return res.sendStatus(403);
    }

    try {
        const resul = await musicService.registerMusic(name, youtubeLink);
        res.status(201).send(resul);
    } catch (error) {
        if (error.name === 'MusicError') {
            return res.status(409).send(error.message);
        }
        next(error);
    }
}

async function addVote(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.sendStatus(400);
    }

    try {
        await musicService.addVoteMusic(id);
        return res.sendStatus(200);
    } catch (error) {
        if (error.name === 'MusicError') {
            return res.status(404).send(error.message);
        }
        next(error);
    }
}

async function removeVote(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.sendStatus(400);
    }

    try {
        await musicService.removeVoteMusic(id);
        return res.sendStatus(200);
    } catch (error) {
        if (error.name === 'MusicError') {
            return res.status(404).send(error.message);
        }
        next(error);
    }
}

async function randomMusics(req, res, next) {
    try {
        const musics = await musicService.randomSongs();
        return res.send(musics);
    } catch (error) {
        if (error.name === 'MusicError') {
            return res.status(404).send(error.message);
        }
        next(error);
    }
}

async function topsMusics(req, res, next) {
    const { amount } = req.params;

    try {
        const musics = await musicService.topsSongs(Number(amount));
        return res.send(musics);
    } catch (error) {
        if (error.name === 'MusicError') {
            return res.status(404).send(error.message);
        }
        next(error);
    }
}

export {
    storeMusic,
    addVote,
    removeVote,
    randomMusics,
    topsMusics,
};
