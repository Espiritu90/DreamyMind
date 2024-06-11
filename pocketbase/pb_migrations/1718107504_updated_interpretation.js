/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sip6o9fvriiyzmm")

  // remove
  collection.schema.removeField("l2ngukxh")

  // remove
  collection.schema.removeField("fzan5urs")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sip6o9fvriiyzmm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l2ngukxh",
    "name": "nightmare",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fzan5urs",
    "name": "topic",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
