/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
import { musicSchema } from '../validations/schemas.js';
import * as musicService from '../services/music.service.js';

async function storeMusic(req, res) {
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
        res.sendStatus(500);
    }
}

export { storeMusic };
