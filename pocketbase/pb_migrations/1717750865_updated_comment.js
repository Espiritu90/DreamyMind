/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yxsj3m198r6osi3")

  // remove
  collection.schema.removeField("amtmo3n6")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yxsj3m198r6osi3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "amtmo3n6",
    "name": "post",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "b4mlav5z7rxb6u0",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
