const host = "localhost";
const PORT = process.env.PORT || 3000;

const pgConfig = {
  connectionString:
    "postgres://yfmyivcm:ElLMXZNNIdKdW6lR_DfkmwGa9e7J9FZE@chunee.db.elephantsql.com/yfmyivcm",
};

module.exports = { host, PORT, pgConfig };
