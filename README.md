## Description

Basic Api that could be used for parking

- Create parking with differents fees (aswell as free periods)
- Create Tiket linked to a parking
- Ticket price check


## Installation

```bash
$ npm install
```

## Env variable
here is my setup for the environment variable, it's a temporary core created on mongodb Atlas, it will be deleted after so i can share it here.

```bash
NODE_ENV=dev
PORT = 8080
DATABASE_URL=mongodb+srv://TestUSER:test123456@luctest.s69oiyf.mongodb.net/?retryWrites=true&w=majority
BASIC_API_KEY="Basic 11edd183-df97-4b78-b18d-8b36d56cb6a6"
```

## Running the app

```bash

$ npm run start


```


## Api Doc
<br/>


### Parking: 

| Méthode http | Url | Méthod|Return| Commentaire |
| ----------- | ------| ------ |------|-----|
| GET | /parking/all | | Parkings list | Get all parkings existing in database|
| GET | /parking/:id | :id = parking id | Parking object | Get parking by id |
| POST | /parking/Add |Requires: { name: string, location: string, availableSlots: number, totalSlots: number, price:{ freeLengthInMin: number, pricePerHour: number } } | Parking object | Create a new parking|
| DELETE | /parking/:id | :id = parking id |  | Delete parking by id |
<br/>

### Ticket: 

| Méthode http | Url | Méthod|Return| Commentaire |
| ----------- | ------| ------ |------|-----|
| GET | /ticket/all | | tickets list | Get all tickets existing in database|
| GET | /ticket/:id | :id = ticket id | ticket object | Get ticket by id |
| GET | /ticket/priceCheck/:id | :id = ticket id | ticket object | Get the current price of the ticket |
| POST | /ticket/arival |Requires: { parkingID: number } | Ticket object | Create a new ticket|
| PATCH | /ticket/departure/:id | :id = ticket id / | Goodbye message | Update the ticket once paid, set paid to "true" |
