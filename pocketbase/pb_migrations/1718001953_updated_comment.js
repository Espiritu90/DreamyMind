/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yxsj3m198r6osi3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qtv0bv86",
    "name": "likes",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yxsj3m198r6osi3")

  // remove
  collection.schema.removeField("qtv0bv86")

  return dao.saveCollection(collection)
})
