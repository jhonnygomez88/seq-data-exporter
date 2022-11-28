const { Parser } = require('json2csv');

const getCSV = (obj, header) => {
    try {
        const parser = new Parser({header});
        const csv = parser.parse(obj);
        return csv+"\n";
    } catch (err) {
        console.error(err);
        return null;
    }
}
module.exports = { getCSV };