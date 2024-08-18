const mysql = require("mysql2/promise");
const fs = require("fs");

const jsonData = require("./client/src/output.json");

async function createDatabase(connection) {
    const query = `CREATE DATABASE hagah;`;
    await connection.execute(query);
}

async function createTable(connection) {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS bible_data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            book VARCHAR(50),
            chapter INT,
            verse INT NULL,
            section INT,
            type VARCHAR(50),
            value TEXT NULL
        );
    `;
    await connection.execute(createTableQuery);
}

async function insertData() {
    const connection = await mysql.createConnection({
        host: "hagah-db.c5gya20c67k7.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "SvdVb_pAM4<lbvsPXsu7$O{|9n7b",
        database: "hagah",
    });

    try {
        await connection.beginTransaction();
        //await createDatabase(connection);
        //await createTable(connection);
        //await connection.execute('ALTER DATABASE hagah CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;') 
        //await connection.execute('ALTER TABLE bible_data CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;');
        await connection.execute('DELETE FROM bible_data;');
        for (const book in jsonData) {
            const entries = jsonData[book];
            for (const entry of entries) {
                const { type } = entry;
                const verse = entry?.verse ?? null;
                const value = entry?.value ?? null;
                const chapter = entry?.chapter ?? null;
                const section = entry?.section ?? null;
                const query = `
                        INSERT INTO bible_data (book, chapter, verse, section, type, value)
                        VALUES (?, ?, ?, ?, ?, ?)
                    `;
                const values = [book, chapter, verse || null, section, type, value || null];
                await connection.execute(query, values);
                //console.log({ query, values });
            }
        }
        // const select = 'select * from bible_data;';
        // response = await connection.execute(select);
        // console.log(response);
        await connection.commit();
        console.log("Data inserted successfully.");
    } catch (error) {
        await connection.rollback();
        console.error("Error inserting data:", error);
    } finally {
        await connection.end();
    }
}

insertData();
