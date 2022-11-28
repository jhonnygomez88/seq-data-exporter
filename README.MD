# Sequencial Data Exporter
Tool to execute paginated queries to an specific table of a BD applying filters(conditions) and storing iteratively (in batches) the result in a plaintext file (csv).

## Configuration

### Env File
```
ORACLE_CONNECTION_STRING=0.0.0.0/MY_DB
ORACLE_PASSWORD=MYPASSWORD
ORACLE_USER=MYUSERNAME
```

## Installation
```sh
npm i
```

## Execution

### Help
```sh
npm run start -- --help
```

### Example
```sh
npm run start -- 
-t 'EMAIL_QUEUE' 
-k 'ID_EMAIL' 
-a 'ID_EMAIL,DS_EMAIL1,DS_EMAIL2,NM_RECIPIENT,DS_SUBJECT,IN_HTML,DT_SENT,ID_ADDED,DT_ADDED,ID_UPDATED,DT_UPDATED' 
-c "DT_ADDED BETWEEN TO_DATE('2022/01/01','yyyy/mm/dd') AND TO_DATE('2022/11/30','yyyy/mm/dd')" 
-b 1000 
-f 'email_queue.csv'
```

### DEV NOTES
The tool uses the oracle pagination to get the registers

```sql
SELECT * FROM MY_TABLE WHERE ATTRIBUTE == 'A' OFFSET 0 ROWS FETCH NEXT 5000 ROWS ONLY;
```

### EXECUTION NOTES
- The attributes (-a) should be comma separated.
- The conditions (-c) should be in SQL format and don't have any limitation.
- The file (-f) may be stored in any folder specifing the path (the user should have access).
