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

export const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Le Carnet Gourmand API",
      version: "0.1.0",
      description:
        "API Documentation for 'Le Carnet Gourmand' project, built with Express and documented with Swagger.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Development Team",
        email: "prtclement.ctc@gmail.com",
      },
    },
  },
    apis: ["./src/docs/*.js", "./src/docs/**/*.js"],
}

process.on("SIGINT", async () => {
    await closeDB()
    process.exit(0)
})
