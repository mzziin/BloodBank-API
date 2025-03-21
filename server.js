import app from './app.js'

const startServer = async () => {
    try {
        const PORT = process.env.PORT || 3000;

        //start server after db is connected
        app.listen(PORT, () => {
            console.log(`server is running on prot ${PORT}`)
        })
    } catch (error) {
        console.error('Error starting server:', error.message)
        process.exit(1)
    }
}

startServer()