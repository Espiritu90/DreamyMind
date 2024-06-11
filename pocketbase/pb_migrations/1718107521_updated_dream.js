/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mplfg6827j4rd3s")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dhommat1",
    "name": "nightmare",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mplfg6827j4rd3s")

  // remove
  collection.schema.removeField("dhommat1")

  return dao.saveCollection(collection)
})
