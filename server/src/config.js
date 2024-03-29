
const config = {
  database: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  mongoConfig: {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
};

module.exports = config;
