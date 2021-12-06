/* eslint-disable camelcase */
import MusicError from '../../src/errors/MusicError.js';
import * as musicRepository from '../../src/repositories/music.repository.js';
import * as musicService from '../../src/services/music.service.js';

describe('POST /recommendations', () => {
    it('Recommendation creation success', async () => {
        jest.spyOn(musicRepository, 'storeRecommendation').mockImplementationOnce(() => ({
            id: 1,
        }));

        const youtube_link = 'https://www.youtube.com/watch?v=eVTXPUF4Oz4';
        const name = 'link park';
        const result = await musicService.registerMusic(name, youtube_link);

        expect(result).toEqual({
            id: 1,
        });
    });

    it('Recommendation creation failed', async () => {
        jest.spyOn(musicRepository, 'storeRecommendation').mockImplementationOnce(() => undefined);
        const result = await musicService.registerMusic();
        expect(result).toBeUndefined();
    });
});

describe('POST/recommendations/:id/upvote', () => {
    it('Score add', async () => {
        jest.spyOn(musicRepository, 'getMusic').mockImplementationOnce(() => [{
            id: 1,
            name: 'nameMusic',
            youtubeLink: 'www.linkOfMusic.com',
            score: 0,
        }]);
        jest.spyOn(musicRepository, 'updateScore').mockImplementationOnce(() => 1);
        const result = await musicService.addVoteMusic(1);
        expect(result).toEqual(1);
    });

    it('Score add without id', async () => {
        jest.spyOn(musicRepository, 'getMusic').mockImplementationOnce(() => [{
            id: 1,
            name: 'nameMusic',
            youtubeLink: 'www.linkOfMusic.com',
            score: 0,
        }]);
        jest.spyOn(musicRepository, 'updateScore').mockImplementationOnce(() => 0);
        const result = await musicService.addVoteMusic();
        expect(result).toEqual(0);
    });
});

describe('POST /recommendations/:id/downvote', () => {
    it('Score decrease when greater than -5', async () => {
        jest.spyOn(musicRepository, 'getMusic').mockImplementationOnce(() => [{
            id: 1,
            name: 'nameMusic',
            youtubeLink: 'www.linkOfMusic.com',
            score: 5,
        }]);
        jest.spyOn(musicRepository, 'updateScore').mockImplementationOnce(() => 1);
        const result = await musicService.removeVoteMusic(1);
        expect(result).toEqual(1);
    });

    it('Score decrease when equal to -5', async () => {
        jest.spyOn(musicRepository, 'getMusic').mockImplementationOnce(() => [{
            id: 1,
            name: 'nameMusic',
            youtubeLink: 'www.linkOfMusic.com',
            score: -4,
        }]);
        jest.spyOn(musicRepository, 'updateScore').mockImplementationOnce(() => 1);
        const result = await musicService.removeVoteMusic(1);
        expect(result).toEqual(1);
    });

    it('Recommendation exclusion when score less than -5', async () => {
        jest.spyOn(musicRepository, 'getMusic').mockImplementationOnce(() => [{
            id: 1,
            name: 'nameMusic',
            youtubeLink: 'www.linkOfMusic.com',
            score: -5,
        }]);
        jest.spyOn(musicRepository, 'updateScore').mockImplementationOnce(() => 1);
        jest.spyOn(musicRepository, 'deleteRecommendation').mockImplementationOnce(() => true);
        const result = await musicService.removeVoteMusic(1);
        expect(result).toEqual(1);
    });
});

describe('GET /recommendations/top/:amount', () => {
    it('List top recommendations by limit', async () => {
        jest.spyOn(musicRepository, 'topMusics').mockImplementationOnce(() => [{
            id: 1,
            name: 'nameMusic',
            youtubeLink: 'www.linkOfMusic.com',
            score: 0,
        }]);
        const result = await musicService.topsSongs(1);
        expect(result).toEqual([{
            id: 1,
            name: 'nameMusic',
            youtubeLink: 'www.linkOfMusic.com',
            score: 0,
        }]);
    });
});

describe('GET /recommendations/random', () => {
    it('List random recommendation with not musics', async () => {
        jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.6);
        jest.spyOn(musicRepository, 'getAllMusics').mockImplementationOnce(() => []);
        const result = musicService.randomSongs();
        await expect(result).rejects.toThrowError(MusicError);
    });

    it('List random recommendation by perc >= 70', async () => {
        jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.7);
        jest.spyOn(musicRepository, 'getAllMusics').mockImplementationOnce(() => ([
            {
                id: 1,
                name: 'nameofmusic',
                youtubeLink: 'youtube.com/linkofmusic',
                score: 5,
            },
            {
                id: 2,
                name: 'nameofmusic',
                youtubeLink: 'youtube.com/linkofmusic',
                score: -4,
            },
            {
                id: 3,
                name: 'nameofmusic',
                youtubeLink: 'youtube.com/linkofmusic',
                score: 11,
            },
            {
                id: 2,
                name: 'nameofmusic',
                youtubeLink: 'youtube.com/linkofmusic',
                score: -4,
            },
        ]));

        const result = await musicService.randomSongs();
        expect(result).toEqual({
            id: 3,
            name: 'nameofmusic',
            youtubeLink: 'youtube.com/linkofmusic',
            score: 11,
        });
    });

    it('List random recommendation by perc < 0.70', async () => {
        jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.69);
        jest.spyOn(musicRepository, 'getAllMusics').mockImplementationOnce(() => ([
            {
                id: 1,
                name: 'nameofmusic',
                youtubeLink: 'youtube.com/linkofmusic',
                score: 3,
            },
            {
                id: 2,
                name: 'nameofmusic',
                youtubeLink: 'youtube.com/linkofmusic',
                score: -4,
            },
            {
                id: 3,
                name: 'nameofmusic',
                youtubeLink: 'youtube.com/linkofmusic',
                score: 9,
            },
            {
                id: 4,
                name: 'nameofmusic',
                youtubeLink: 'youtube.com/linkofmusic',
                score: -4,
            },
        ]));

        const result = await musicService.randomSongs();
        expect(result).toEqual({
            id: 3,
            name: 'nameofmusic',
            youtubeLink: 'youtube.com/linkofmusic',
            score: 9,
        });
    });

    it('List random recommendation without low score recommendation', async () => {
        jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.70);
        jest.spyOn(musicRepository, 'getAllMusics').mockImplementationOnce(() => ([
            {
                id: 1,
                name: 'nameofmusic',
                youtubeLink: 'youtube.com/linkofmusic',
                score: 11,
            },
        ]));
        const result = await musicService.randomSongs();
        expect(result).toEqual({
            id: 1,
            name: 'nameofmusic',
            youtubeLink: 'youtube.com/linkofmusic',
            score: 11,
        });
    });

    it('List random recommendation without low score recommendation', async () => {
        jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.70);
        jest.spyOn(musicRepository, 'getAllMusics').mockImplementationOnce(() => ([
            {
                id: 1,
                name: 'nameofmusic',
                youtubeLink: 'youtube.com/linkofmusic',
                score: -4,
            },
            {
                id: 2,
                name: 'nameofmusic2',
                youtubeLink: 'youtube.com/linkofmusic',
                score: -4,
            },
        ]));

        const result = await musicService.randomSongs();
        expect(result).toEqual({
            id: 2,
            name: 'nameofmusic2',
            youtubeLink: 'youtube.com/linkofmusic',
            score: -4,
        });
    });
});
