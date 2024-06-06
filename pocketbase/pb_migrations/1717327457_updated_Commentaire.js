/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yxsj3m198r6osi3")

  collection.name = "comment"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yxsj3m198r6osi3")

  collection.name = "Commentaire"

  return dao.saveCollection(collection)
})
