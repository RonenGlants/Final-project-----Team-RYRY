
async function getDataBase(db) {
    return await db.db("ryryDB");
}

async function getTableFromCursor(cursor) {
    var finalTable = [];

    await
        cursor.forEach(item => {
            finalTable.push(item);
        });

    return finalTable;
}


async function find(collection,item) {
    var cursor = await collection.find(item);

    return await getTableFromCursor(cursor);
}

async function update(collection,query, itemToUpdate) {
    var writeResult = await collection.update(query, itemToUpdate, {upsert: true});

    if(writeResult.nMatched == 1 && writeResult.nModified <= 1){
        return true;
    }
    else{
        return false;
    }
}

module.exports = {getDataBase,getTableFromCursor, find, update}