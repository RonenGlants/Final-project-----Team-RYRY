
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
    var allNamedUsers = await collection.find(item);

    return await getTableFromCursor(allNamedUsers);
}

module.exports = {getDataBase,getTableFromCursor, find}