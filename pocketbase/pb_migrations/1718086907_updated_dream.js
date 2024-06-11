/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mplfg6827j4rd3s")

  // remove
  collection.schema.removeField("mpkycao6")

  // remove
  collection.schema.removeField("qlbntc4k")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mplfg6827j4rd3s")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mpkycao6",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qlbntc4k",
    "name": "comments",
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
})
