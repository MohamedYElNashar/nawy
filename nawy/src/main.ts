import express from 'express';
import routes from './routes';
import { connect } from './config/db';
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:8080', 
  methods: ['GET', 'POST', 'PUT', 'DELETE' , 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 7007

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error initializing the app:', err);
    process.exit(1);
  });

export default app;
