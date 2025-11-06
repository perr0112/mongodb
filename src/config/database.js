import mongoose from "mongoose"

export async function connectDB() {
    try {
        const options = {}

        const res = await mongoose.connect(process.env.MONGODB_URI, options)
        console.log("Connecté: ", res.connection.host)
        console.log("Base de données: ", res.connection.name)

        return res
    }
    catch(error) {
        console.log("Error", error.message)

        process.exit(1)
    }
}

export async function closeDB() {
    try {
        await mongoose.connection.close()
        console.log("Connexion Mongodb fermée")
    }
    catch(error) {
        console.log("Error", error.message)

        process.exit(1)
    }
}

process.on("SIGINT", async () => {
    await closeDB()
    process.exit(0)
})
