exports.insertDocument = (db, document, collection, callback) =>{
    //collecion declaration
    const coll = db.collection(collection);
    //insert into the collection
    return coll.insert(document)
};

exports.findDocuments = (db, collection, callback) =>{
       //collecion declaration
       const coll = db.collection(collection);
       //finds collection array
       return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection, callback) =>{
        //collecion declaration
        const coll = db.collection(collection);
        //deletes one collection within array
        return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection, callback) =>{
        //collecion declaration
        const coll = db.collection(collection);
        //updates the collection
        return coll.updateOne(document, { set : update}, null)
};