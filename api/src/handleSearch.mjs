import mysql from "mysql2/promise";
import { getSecret } from "./getSecret.mjs";

export const handler = async (event) => {
    const { query } = event.pathParameters || {};

    if (!query) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing query" }),
        };
    }

    let connection;

    const secret = await getSecret();
    const { username, password } = JSON.parse(secret);

    try {
        if (!username || !password) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Unable to retrieve keys." }),
            };
        }
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: username,
            password: password,
        });

        const [rows] = await connection.execute(
            `SELECT * FROM bible_data WHERE type = 'paragraph text' AND value LIKE ?`,
            [`%${query}%`]
        );

        return {
            statusCode: 200,
            body: JSON.stringify(rows),
        };
    } catch (error) {
        console.error("Error fetching data:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};
