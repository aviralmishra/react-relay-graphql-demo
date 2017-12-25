# react-flux-graphql-demo

React based data-driven application built with Flux, GraphQL and Relay

## Pre Reqs

[PM2](https://www.npmjs.com/package/pm2)

```
npm install pm2 -g
```

## Installation

```
git clone git@github.com:aviralmishra/react-flux-graphql-demo.git

npm install
```

## Dev Server Run

```
npm run dev
```

## Dev Web Run & Watch

```
npm run webpack
```

## Test

```
npm run test
```

## Test Coverage

```
npm run verify-tests
```

## Prod Build

```
npm run build-webpack
npm run build-node
```

## Prod Run

```
npm run start-prod
```

## Links

1. [Node.js MongoDB Driver API](http://mongodb.github.io/node-mongodb-native/3.0/api/)
2. [PM2 Process File](http://pm2.keymetrics.io/docs/usage/application-declaration/)
3. [Relay Classic](https://facebook.github.io/relay/docs/en/classic/classic-guides-containers.html)
4. [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
5. [JavaScript Snippets for Atom](https://atom.io/packages/javascript-snippets)
6. [Atom Editor Cheat Sheet](https://gist.github.com/chrissimpkins/5bf5686bae86b8129bee#atom_search)
7. [Mongo Lab](https://mlab.com)
8. [Bootstrap](http://getbootstrap.com/docs/3.3/css/)

## To Do

1. Automated tests
2. Production build and run

## Sample GraphQL Queries

Once the application is running, visit <http://localhost:8080/graphql> to execute GraphQL queries. Listed below are some things you can run.

Note: These will require that the MongoDB collection is setup and accessible.

```
{
  store {
    albumConnection(first: 5) {
      edges {
        node {
          _id
          id
          title
          released
          art
          artistId
          description
        }
      }
    }
  }
}
```

```
{
  store {
    albumConnection(first: 100, query: "wings") {
      edges {
        node {
          _id
          id
          title
          released
          art
          artistId
          description
          createdAt
        }
      }
    }
  }
}
```

```
mutation CreateAlbumMutation($input: CreateAlbumInput!) {
  createAlbum(input: $input) {
    clientMutationId
    album {
      id
      title
      released
      art
      artistId
      description
    }
  }
}

{
  "input": {
    "clientMutationId": "1005",
    "id": "album-1005",
    "title": "Continuum",
    "released": "2006-09-12",
    "art": "https://en.wikipedia.org/wiki/Continuum_(John_Mayer_album)#/media/File:Continuum_(album).png",
    "artistId": "artist-1002",
    "description": "Continuum is the third studio album by American musician John Mayer. The album debuted at number 2 on the US Billboard 200 chart, selling 300,186 copies in its first week."
  }
}
```
