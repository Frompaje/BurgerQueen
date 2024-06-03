import { app } from "./app";

app.listen({ host: "0.0.0.0", port: 4444 }).then(() => {
  console.log("Server Running");
});
