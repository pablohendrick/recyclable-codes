// Importing necessary libraries
const express = require('express');
const mongoose = require('mongoose');

// Connecting to MongoDB
mongoose.connect('mongodb://localhost/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

// Defining a schema for payment data
const paymentSchema = new mongoose.Schema({
  type: String, // Credit or debit
  cardNumber: String,
  cardHolderName: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

// Creating a model based on the defined schema
const Payment = mongoose.model('Payment', paymentSchema);

// Setting up the Express server
const app = express();
app.use(express.json());

// Route to receive payment data and save it in MongoDB
app.post('/process-payment', async (req, res) => {
  try {
    const { type, cardNumber, cardHolderName, amount } = req.body;

    // Creating a new instance of the Payment model
    const newPayment = new Payment({
      type,
      cardNumber,
      cardHolderName,
      amount
    });

    // Saving payment data to MongoDB
    await newPayment.save();

    res.status(201).json({ message: 'Payment processed successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing the payment.' });
  }
});

// Starting the server on the desired port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
