const { getCSV } = require("./csv");
const { appendFile, createFile } = require("./file");
const { getLimits, getSQLBatches, executeQuery } = require("./oracle");

const generateCSV = async (FILENAME, TABLE, SEQUENCE_ATTRUBTE, ATTRIBUTES, CONDITION, BATCH_SIZE) => {
    console.time("Total elapsed time");

    console.log("Getting count of registers...");
    const limits = await getLimits(TABLE, SEQUENCE_ATTRUBTE, CONDITION);
    console.log(limits);

    const batches = getSQLBatches(TABLE, ATTRIBUTES, CONDITION, limits.COUNT, BATCH_SIZE);

    console.log(`Executing paged queries for (${limits.COUNT}) registers....`);
    let isFirst = true;
    let i = 1;
    for await (const sql of batches) {
        console.log(`Executing query (${i}/${batches.length})`);
        const res = await executeQuery(sql);
        const csv = getCSV(res, isFirst);
        console.log(`Writing ${res.length} registers to ${FILENAME}...`);
        if (isFirst) {
            createFile(FILENAME, csv);
        } else {
            appendFile(FILENAME, csv);
        }
        isFirst = false;
        i++;
    }
    console.log(`File: "${FILENAME}" created successfully with (${limits.COUNT}) registers.`);
    console.timeEnd("Total elapsed time");
}

module.exports = { generateCSV };