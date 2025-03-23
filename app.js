import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import compression from 'compression'
import usersRoutes from './routes/usersRoutes.js'

const app = express()

app.use(cors())
// security
app.use(helmet())
app.use(compression({
    threshold: 1024  // Only compress responses larger than 1KB
}))
dotenv.config()
app.use(express.json())
app.use('/api/v1/users', usersRoutes)

export default app