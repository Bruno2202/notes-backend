import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;
export class DB {
    static pool = new Pool({
        user: PGUSER,
        password: PGPASSWORD,
        host: PGHOST,
        port: PGPORT ? parseInt(PGPORT) : 5432,
        database: PGDATABASE,
        ssl: {
            rejectUnauthorized: false,
        },
    });
    static async dbTime() {
        const res = await this.pool.query('SELECT NOW()');
        console.log(res.rows[0]);
    }
}
