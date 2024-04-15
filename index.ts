import server from "./adapters/web/server/server";

const PORT = process.env.PORT || 3000;

server.listen(PORT).on("listening", () => {
  console.log(`We are live on http://localhost:${PORT}`);
});
