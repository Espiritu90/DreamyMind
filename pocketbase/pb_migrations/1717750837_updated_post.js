/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4mlav5z7rxb6u0")

  // remove
  collection.schema.removeField("2xgavjz4")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4mlav5z7rxb6u0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2xgavjz4",
    "name": "testDream",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "mplfg6827j4rd3s",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
