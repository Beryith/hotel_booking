import express from 'express'
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controller/clerkWebhook.js';

connectDB()

const app = express();
app.use(cors());// Enable Cross-Origin Resource Sharing


// le Middleware  
app.use(express.json()); 
app.use(clerkMiddleware())

//API pour ecouter les Webhooks de Clerk
app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res) => res.send("l'API fonctionne"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));