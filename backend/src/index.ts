import mongoose from 'mongoose';
import { app } from './app';

// Funktion zum Starten des Servers
const startServer = async (): Promise<void> => {
    try {
    // Verbindung zu MongoDB herstellen
    // await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase' , {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useCreateIndex: true,
    // } as mongoose.ConnectOptions);
    
    console.log('Connected to MongoDB');

    // Server starten
    const PORT: number = parseInt(process.env.PORT as string, 10) || 8080;
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
    } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
    }
};
// Server starten
startServer();