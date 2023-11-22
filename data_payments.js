// Defining a schema for payment data
const paymentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['credit', 'debit', 'bank slip', 'paypal', 'pix'] // Types of payment methods
  },
  cardNumber: {
    type: String,
    required: function () {
      return this.type === 'credit' || this.type === 'debit';
    }
  },
  cardHolderName: {
    type: String,
    required: function () {
      return this.type === 'credit' || this.type === 'debit';
    }
  },
  amount: Number,
  boletoCode: {
    type: String,
    required: function () {
      return this.type === 'boleto';
    }
  },
  paypalTransactionId: {
    type: String,
    required: function () {
      return this.type === 'paypal';
    }
  },
  pixKey: {
    type: String,
    required: function () {
      return this.type === 'pix';
    }
  },
  date: { type: Date, default: Date.now }
});

// ...

// Route to receive payment data and save it in MongoDB
app.post('/process-payment', async (req, res) => {
  try {
    const { type, cardNumber, cardHolderName, amount, boletoCode, paypalTransactionId, pixKey } = req.body;

    // Creating a new instance of the Payment model based on payment type
    const newPayment = new Payment({
      type,
      cardNumber,
      cardHolderName,
      amount,
      boletoCode,
      paypalTransactionId,
      pixKey
    });

    // Saving payment data to MongoDB
    await newPayment.save();

    res.status(201).json({ message: 'Payment processed successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing the payment.' });
  }
});

// ...