import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway"
import { ApolloServerPluginInlineTraceDisabled, ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core"
import { ApolloServer } from "apollo-server-express"

import { GRAPHQL_DEBUG, GRAPHQL_INTROSPECTION } from "../enum"

export const generateGraphqlServer = async () => {
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        {
          name: "user",
          url: "http://localhost:3452/api/graphql/v1"
        },
        {
          name: "product",
          url: "http://localhost:3451/api/graphql/v1"
        }
      ]
    })
  })

  // generate playground plugin
  const generatePlaygroundPlugins = () => {
    return ApolloServerPluginLandingPageLocalDefault()
  }

  // create apollo server
  const graphqlServer = new ApolloServer({
    introspection: GRAPHQL_INTROSPECTION,
    debug: GRAPHQL_DEBUG,
    context: ({ req }) => ({ req: { headers: req.headers } }),
    plugins: [ApolloServerPluginInlineTraceDisabled(), generatePlaygroundPlugins()],
    gateway
  })

  return graphqlServer
}
