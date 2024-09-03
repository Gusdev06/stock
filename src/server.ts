import app from ".";


app.listen(process.env.PORT ?? 3333, () =>
    console.log(`Server is running at ${process.env.PORT}!`),
).on("close", () => {
    console.log("Prisma was disconnected");
});