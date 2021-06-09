# Database dump

Mock data for the application.

## Export

mongodump -d smarteval -o . --port=27018 

## Import

mongorestore -d db_name /path/