import knex from 'knex';
import dotenv from 'dotenv';
import ReadCsvFileToArray from '../../utils/ReadCsvFileToArray';
dotenv.config();

const connection = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA,
        multipleStatements: true,
    },
});

const createTables = async (): Promise<boolean> => {
    try {
        await connection                // tamplate String
            .raw(`
                CREATE TABLE IF NOT EXISTS shopper_Products (
                    id VARCHAR(64) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    price DECIMAL(15,4),
                    qty_stock INTEGER
                );
                CREATE TABLE IF NOT EXISTS shopper_Orders (
                    id VARCHAR(64) PRIMARY KEY,
                    name_client VARCHAR(255) NOT NULL,
                    delivery_date TIMESTAMP NOT NULL
                );

                
                CREATE TABLE IF NOT EXISTS shopper_Order_Itens (
                    id VARCHAR(64) PRIMARY KEY,
                    order_id VARCHAR(64) NOT NULL,
                    product_id VARCHAR(64) NOT NULL,
                    qty_requested INTEGER NOT NULL,
                    FOREIGN KEY(order_id) REFERENCES shopper_Orders(id),
                    FOREIGN KEY(product_id) REFERENCES shopper_Products(id)
                );
            `);
        console.log("Tabelas criadas com sucesso!");
        return true;
    } catch (e) {
        const error = e as Error;
        console.log(error);
        return false;
    }
};



const insertProducts = async (): Promise<boolean> => {
    try {
        const products = ReadCsvFileToArray('./src/data/migrations/products_ascii.csv');
        await connection('shopper_Products').insert(products)
        return true
    } catch (error) {
        console.log(error);
        return false;
    }
}

const closeConnection = () => { connection.destroy(); };

createTables()
    .then(insertProducts)
    .finally(closeConnection);