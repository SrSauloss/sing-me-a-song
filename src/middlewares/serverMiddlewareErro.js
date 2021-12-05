/* eslint-disable no-unused-vars */
async function errorMiddleware(err, req, res, next) {
    console.error('Middleware de erro: ', err);
    return res.sendStatus(500);
}

export default errorMiddleware;
