import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import usersRoutes from './routes/usersRoutes.js'

const app = express()

app.use(cors())
app.use(helmet())
dotenv.config()
app.use(express.json())
app.use('/api/v1/users', usersRoutes)

export default app