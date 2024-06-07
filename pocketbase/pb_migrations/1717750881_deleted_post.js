/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("b4mlav5z7rxb6u0");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "b4mlav5z7rxb6u0",
    "created": "2024-05-28 09:46:44.412Z",
    "updated": "2024-06-07 09:00:37.589Z",
    "name": "post",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jpfx4hey",
        "name": "liked",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
