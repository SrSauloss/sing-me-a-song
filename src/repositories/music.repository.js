/* eslint-disable import/prefer-default-export */
import connection from '../database/connection.js';

async function storeRecommendation(name, link) {
    const resul = await connection.query('SELECT * FROM songs WHERE name = $1', [name]);

    if (resul.rowCount !== 0) {
        return null;
    }

    const { rows } = await connection.query(
        'INSERT INTO songs (name, youtube_link) VALUES($1, $2) RETURNING id',
        [name, link],
    );

    return rows[0];
}

export {
    storeRecommendation,
};
