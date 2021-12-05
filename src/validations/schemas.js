/* eslint-disable no-useless-escape */
/* eslint-disable prefer-regex-literals */
/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const musicSchema = Joi.object({
    name: Joi.string()
        .required(),
    youtubeLink: Joi.string()
        .pattern(new RegExp('^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$'))
        .required(),
});

export {
    musicSchema,
};
