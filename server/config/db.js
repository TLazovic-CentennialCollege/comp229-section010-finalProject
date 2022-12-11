module.exports = 
{
    "URI": process.env.MONGO_URI || "mongodb://localhost:27017,localhost:27018,localhost:27019/comp_229?replicaSet=rs0",
    // "URI": "mongodb+srv://thomas:Hq3DKYN2NaAqGyyV@mongodbserver.k15hk.azure.mongodb.net/comp_229?retryWrites=true&w=majority",
    "Secret": 'SomeSecret'
}
