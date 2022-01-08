SELECT
        pg_terminate_backend (pid)
    FROM
        pg_stat_activity
    WHERE
        datname = 'newfoods';
    
    ALTER DATABASE newfoods RENAME TO newfoods_123bckp;

    DROP DATABASE IF EXISTS newfoods;

    CREATE DATABASE newfoods
        WITH
        OWNER = 'svom'
        ENCODING = 'UTF8'
        LC_COLLATE = 'Portuguese_Brazil.1252'
        LC_CTYPE = 'Portuguese_Brazil.1252'
        TABLESPACE = pg_default
        CONNECTION LIMIT = -1;