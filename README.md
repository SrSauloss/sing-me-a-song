<h1 align='center'>🎶🎵 Sing me a Song API 🎵🎶</h1>

<p align='center'>Sing me a song allows you to recommend songs by sharing the song's youtube link</p>

## Installation
  
        git clone https://github.com/SrSauloss/sing-me-a-song.git
        cd sing-me-a-song
        npm i

## Start 
`npm run start:test`

## Requests
+ POST /recommendations
    - body: 
    ```js
       {
          "name": "Título do vídeo da música",
          "youtubeLink": "link da música",
       }
    ```
    - response: status code 201
    
+ POST /recommendations/:id/upvote
    - parameter: id (recommendation id)
    - response: status code 200
    
+ POST /recommendations/:id/downvote
    - parameter: id (recommendation id)
    - response: status code 200
    
+ GET /recommendations/random
    - response:
: 
    ```js
        {
          "id": 1,
          "name": "Título do vídeo da música",
          "youtubeLink": "link da música",
          "score": 245
        },
    ```
+ GET /recommendations/top/:amount
    - parameter: amount (recommendation limit)
    - response:
: 
    ```js
        [
          {
            "id": 150,
            "name": "Título do vídeo da música",
            "youtubeLink": "link da música",
            "score": 245
          },
          {
            "id": 12,
            "name": "Título do vídeo da música",
            "youtubeLink": "link da música",
            "score": 112
          },
          ...
        ]
    ```
## Tests (unit)
- `npm run test:watch`

 
