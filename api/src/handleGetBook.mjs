import mysql from "mysql2/promise";

export const handler = async (event) => {
    const { book } = event.pathParameters || {};
    const chapter = event.pathParameters?.chapter || null;
    const verse = event.pathParameters?.verse || null;

    if (!book) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing book parameter" }),
        };
    }

    let connection;

    let query = `SELECT * FROM bible_data WHERE book = '${book}'`;

    if (chapter) {
        query += ` AND chapter =' ${chapter}'`;
    }

    if (verse) {
        query += ` AND verse = '${verse}';`;
    }

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
            user: credentials.username,
            password: credentials.password,
        });

        const [rows] = await connection.query(query);

        return {
            statusCode: 200,
            body: JSON.stringify(rows),
        };
    } catch (error) {
        console.error("Error fetching data:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: error }),
        };
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};

async function getSecret(secretName) {
    const params = {
        SecretId: secretName,
    };

    try {
        const data = await secretsManager.getSecretValue(params).promise();
        if ("SecretString" in data) {
            return JSON.parse(data.SecretString);
        } else {
            let buff = Buffer.from(data.SecretBinary, "base64");
            return JSON.parse(buff.toString("ascii"));
        }
    } catch (err) {
        console.log(`Error retrieving secret ${secretName}:`, err);
        throw err;
    }
}
