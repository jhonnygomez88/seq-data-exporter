const program = require('commander');
const pkg = require('./package');

program
  .version(pkg.version)
  .requiredOption('-t, --table <table>', 'Table of the bd to extract the data from')
  .requiredOption('-k, --key <key>', 'Id attribute of the table')
  .requiredOption('-a, --attributes <attributes>', 'Attributes of the table that will be included in the csv file')
  .requiredOption('-c, --condition <condition>', "Condition of the registers to be included")
  .option('-b, --batch <batch>', 'Batch size of the split', 5000)
  .requiredOption('-f, --file <file>', 'Destination file')
  .parse(process.argv);


const { generateCSV } = require("./util/batchexporter");

program.parse();
const options = program.opts();

const TABLE = options.table;
const SEQUENCE_ATTRUBTE = options.key;
const ATTRIBUTES = options.attributes.split(",");
const CONDITION = options.condition;
const BATCH_SIZE = Number(options.batch);
const FILENAME = options.file;

(async ()=>{
    try {
        await generateCSV(FILENAME, TABLE, SEQUENCE_ATTRUBTE, ATTRIBUTES, CONDITION, BATCH_SIZE);
    } catch (error) {
        console.error(error);
    }finally{
        process.exit();
    }
})();