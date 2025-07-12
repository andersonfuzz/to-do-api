import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool }= pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
export default class TaskRepository {
    async create(task) {
        const result = await pool.query(
            `INSERT INTO tasks (name, description, status, priority, due_date, created_at)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [
                task.name,
                task.description,
                task.status,
                task.priority,
                task.dueDate,
                task.createdAt,
            ]
        );
        return result.rows[0];
    }
    async findAll() {
        const result = await pool.query(
            `SELECT * FROM tasks ORDER BY created_at DESC`
        );
        return result.rows;
    }
}