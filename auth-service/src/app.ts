import { Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

// Assuming that these modules have default exports
import app from '@config/serverOptions';

// Import routes


// Use routes
// app.use('/api/vehicleCompany', routerVehicleCompany);

// Error handling
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err: any, res: Response) => {
  res.status(500).send({ message: err.message });
});