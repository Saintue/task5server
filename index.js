import express from "express";
import router from "./routes/routes.js";
import cors from "cors";

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);
async function startApp() {
  await app.listen(PORT, () => console.log("server started on port: " + PORT));
}

startApp().catch((error) => {
  console.log(error);
});
