/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
import { musicSchema } from '../validations/schemas.js';

async function storeMusic(req, res) {
    const { name, youtubeLink } = req.body;

    if (musicSchema.validate({ name, youtubeLink }).error) {
        return res.sendStatus(403);
    }
    res.sendStatus(201);
}

export { storeMusic };
