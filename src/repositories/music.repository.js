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

async function getMusic(id) {
    const resul = await connection.query('SELECT id, name, youtube_link AS "youtubeLink", score FROM songs WHERE id = $1', [id]);
    return resul.rows[0];
}

async function updateScore(music, points) {
    const resul = await connection.query('UPDATE songs SET score = $1 WHERE name = $2', [points, music]);
    return resul.rowCount;
}

async function deleteRecommendation(id) {
    const resul = await connection.query('DELETE FROM songs WHERE id = $1', [id]);
    return resul.rowCount;
}

async function getAllMusics() {
    const resul = await connection.query('SELECT id, name, youtube_link AS "youtubeLink", score FROM songs');
    return resul.rows;
}

async function topMusics(limit) {
    const resul = await connection.query('SELECT id, name, youtube_link AS "youtubeLink", score FROM songs ORDER BY score DESC LIMIT $1', [limit]);
    return resul.rows;
}

export {
    storeRecommendation,
    getMusic,
    updateScore,
    deleteRecommendation,
    getAllMusics,
    topMusics,
};
