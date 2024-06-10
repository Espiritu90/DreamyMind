/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yxsj3m198r6osi3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7wfje1mf",
    "name": "dream",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yxsj3m198r6osi3")

  // remove
  collection.schema.removeField("7wfje1mf")

  return dao.saveCollection(collection)
})
