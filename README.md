# Codenotary Fullstack Challenge!

This is a simple application challenge made by Codenotary for their fullstack engineer (frontend focused) position. Thank you for your time!

#### Requirements:

- Application is storing accounting information within immudb Vault with the following structure: account number (unique), account name, iban, address, amount, type (sending, receiving)
- Application has an API to add and retrieve accounting information
- Application has a frontend that displays accounting information and allows to create new records.

#### The solution should:

- Have a readme
- Have a documented API
- Have docker-compose so it is easy to run.

## Tech stack

- React.js for the frontend with TanStack & TRPC
- Node.js with TRPC & Express
- ImmuDB for the database
- Docker & docker compose to run everything via one command

# Running

Please install docker & docker compose in your machine.

Clone this repository, and on the root folder run `docker compose up`

## Docs

You'll find documentation in url `http://localhost:7070/docs` with all the router endpoints documented and readily to be tested

## Running tests

After running `docker compose up`, run `docker ps` and find the id of the container that is running the Node.js, and ssh to it using:

```zsh
docker exec -it UNIQUE_ID /bin/bash

```

After getting in run:

```zsh
pnpm test

```

## App

App will be exposed on 3000 after running docker compose up. Run `docker ps` and find the id of the container that is running the Node.js, and ssh to it using:

```zsh
docker exec -it UNIQUE_ID /bin/bash
```

and then:

```zsh
pnpm test
```

# Things that could be improved

### DB setup for testing

It would be a whole lot better to run tests locally if there was a inmemory db, or a whole database name that could be removed once tests ran in the backend.

### FE testing

More testing could be done on the hooks, shell components and components, etc.

~~### Refactor of home-page.tsx~~

~~I would be a whole lot better if we had a component like TransactionsTable~~
