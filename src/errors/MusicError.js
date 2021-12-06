class MusicError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MusicError';
    }
}

export default MusicError;
