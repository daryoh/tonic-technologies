const mongoose = require("mongoose");

const start = async (app) => {
  const port = process.env.PORT || 8000;
  try {
    mongoose.connect(
      process.env.MONGODB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Tonic Tech Server started on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { start };