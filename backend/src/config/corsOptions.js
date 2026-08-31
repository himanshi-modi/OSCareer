const corsOptions = {
    origin: [
        "http://localhost:5173", // React (Vite)
        process.env.CLIENT_URL  // React (CRA)
    ],

    credentials: true,

    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ],

    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ]
};

module.exports = corsOptions;