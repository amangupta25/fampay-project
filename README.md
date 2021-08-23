# FamTube 

## About

A project to provide APIs and UI Dashboard to fetch published videos from Youtube Data v3 API

## Bonus Feature
- Support for supplying multiple API keys so that if quota is exhausted on one, it automatically uses the next available key.
- A dashboard to view the stored videos with filters and sorting options.
## Tech Stack

- UI built on React.js
- Server built on Node.js
- Postgres as Database
- Sequelize as ORM for Database communication
- Material UI for UI components
- pgAdmin (Add on)
#
**NOTE: Please put your Youtube Data v3 API Key before running this project in any mode**

## To build and start the project in production mode with docker
_First, replace <API-KEY> in docker-compose.yml file with your api key (or list of comma separated api keys)_ <br><br>
Run the following cmd from the root of the project dir : 
```bash
docker-compose up --build -d 
```

After docker container is up and running, then open:
```localhost:7000``` on your browser. TaDa!

#
**Important: To run the project in any of the below mode (i.e. apart from dockerized), make sure you have a up and running Postgres db**
## To build and start the project in production mode locally
_First, replace <API-KEY> in .env file with your api key (or list of comma separated api keys)_ <br><br>

Run the following cmd from the root of the project dir : 

1. ```npm run build```
then
2. ```npm run build:server```

## To run the project in development mode locally
_First, replace <API-KEY> in .env file with your api key (or list of comma separated api keys)_ <br><br>

Run the following cmd from the root of the project dir : 

1. ```npm run start```

In another terminal, run

2. ```npm run dev:server```

## UI:

![](/screeshots/preview.png)
<br>
_More Screenshots present in screenshots dir inside this project_

## APIs
- Paginated
- Filterable on:
   <br> a. title
   <br> b. description
   
- Sortable (ASC OR DESC) on:
   <br> a. title
   <br> b. description
   <br> c. thumbnail
   <br> d. pub_datetime 


### Endpoint:
GET
```http request
/api/all?title={TITLE}&description={DESCRIPTION}&orderBy={COLUMN_NAME}&direction={DIRECTION}&page={PAGE_NO}&size={LIMIT}
```
**TITLE** : Title String to be searched for <br>
**DESCRIPTION** : Description String to be searched for <br>
**COLUMN_NAME** : title | description | thumbnail | pub_datetime <br>  
**DESCRIPTION** : Description String to be searched for <br>
**DIRECTION** : ASC | DESC (default: DESC) <br>
**PAGE_NO** : Page no (paginated api, default: 0) <br>
**LIMIT** : Count per page (paginated api, default: 5) <br>

### Sample Request
```shell script
curl --location --request GET 'localhost:7000/api/all?title=dil&description=moon&orderBy=title&direction=DESC&page=0&size=5' \
--header 'Content-Type: application/json'
```

### Sample Response
```json
{
    "response": {
        "totalItems": 3,
        "videos": [
            {
                "id": "kwhfmFhQ_fc",
                "title": "VOID: Diljit Dosanjh (Official Audio) Intense | Raj Ranjodh | MoonChild Era | Latest Song 2021",
                "description": "Presenting full audio of the song VOID performed by DILJIT DOSANJH from the album MoonChild Era. Watch \"LOVER\" video song: ...",
                "pub_datetime": "2021-08-21T19:43:36.000Z",
                "thumbnail": "https://i.ytimg.com/vi/kwhfmFhQ_fc/default.jpg"
            },
            {
                "id": "bRUvh1me7wQ",
                "title": "HOOPS: Diljit Dosanjh (Official Audio) Intense | Raj Ranjodh | MoonChild Era | Latest Song 2021",
                "description": "Presenting full audio of the song HOOPS performed by DILJIT DOSANJH from the album MoonChild Era. Watch \"LOVER\" video song: ...",
                "pub_datetime": "2021-08-21T20:21:08.000Z",
                "thumbnail": "https://i.ytimg.com/vi/bRUvh1me7wQ/default.jpg"
            },
            {
                "id": "Yyr72jjAIKE",
                "title": "CALI: Diljit Dosanjh (Official Audio) Intense | Raj Ranjodh | MoonChild Era | Latest Song 2021",
                "description": "Presenting full audio of the song CALI performed by DILJIT DOSANJH from the album MoonChild Era. Watch \"LOVER\" video song: ...",
                "pub_datetime": "2021-08-21T20:05:08.000Z",
                "thumbnail": "https://i.ytimg.com/vi/Yyr72jjAIKE/default.jpg"
            }
        ],
        "totalPages": 1,
        "currentPage": 0,
        "limit": 5
    }
}
```

## pgAdmin Portal

You can access the portal at ```localhost:8080```.<br>
<br> Username: ```admin@famtube.com```
<br> Passsword: ```famtube```

To connect you postgres db server in pgAdmin:

- Enter Host: <br>
Note: _To get the host ip of you postgres container you can use the following cmd:_
```docker inspect postgres | grep IPAddress```
- Port: **5432**
- Username: **fp**
- Password: **password**

