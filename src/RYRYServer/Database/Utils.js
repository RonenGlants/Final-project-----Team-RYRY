
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
    writeResult = writeResult.result;

    return true;
}

function getDate(_date,_time){
    var date = _date.split("-");
    var time = _time.split(":");
    var year = parseInt(date[0]);
    var month = parseInt(date[1]);
    var day = parseInt(date[2]);
    var hour = parseInt(time[0]);
    var min = parseInt(time[1]);
    var res = new Date();
    res.setFullYear(year, month - 1, day);
    res.setHours(hour);
    res.setMinutes(min);
    return res;
}
module.exports = {getDate,getDataBase,getTableFromCursor, find, update}