import app from './app.js'
import connectDb from './config/db.config.js';

const startServer = async () => {
    try {
        //connect to db
        await connectDb();

        //start server after db is connected
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`server is running on prot ${PORT}`)
        })
    } catch (error) {
        console.error('Error starting server:', error.message)
        process.exit(1)
    }
}

startServer()