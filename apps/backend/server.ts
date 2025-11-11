import { createYoga, createSchema } from "graphql-yoga";
import { createServer } from "http";
import { typeDefs } from "./src/graphql/typeDefs.generated";
import { resolvers } from "./src/graphql/resolvers.generated";

const yoga = createYoga({ schema: createSchema({ typeDefs, resolvers }) });
const server = createServer(yoga);
server.listen(4000, () =>
  console.log("Server running on port http://localhost:4000/graphql")
);
