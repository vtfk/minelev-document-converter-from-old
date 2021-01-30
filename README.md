# minelev-document-converter-from-old

## Setup

1. `git clone git@github.com:vtfk/minelev-document-converter-from-old.git`
1. `npm i`
1. Create a `.env` file:
    ```bash
    NODE_ENV=development
    MONGODB_CONNECTION=mongodb+srv://<username>:<password>@<server>?retryWrites=true&w=majority
    MONGODB_COLLECTION_NEW=<new-collection>
    MONGODB_NAME_NEW=<new-db>
    MONGODB_COLLECTION_OLD=<old-collection>
    MONGODB_NAME_OLD=<old-db>
    ```

## Convert

To convert all documents from old db to new db:

`node index.js`

To convert only given documents from old db to new db:

`node index.js guid1 guid2 guid3`

## Backup

To backup all documents from old db to folder test/backup:

`node backup.js`

## Flush

To remove all documents from old db to new db:

`node prepare.js` 

## Insert

To insert one specified document into old db:

1. Open insert.js
1. Insert document at line 15
`node insert.js`
