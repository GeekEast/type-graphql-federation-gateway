import "reflect-metadata"

import { generateGraphqlServer } from "./bootstrap/apollo.bootstrap"
import { start } from "./bootstrap/express.bootstrap"
import { registerProviders } from "./providers"
import { startNodeProcessErrorMonitor } from "./providers/utils/errors/nodeMonitor.util"

const main = async () => {
  // start monitoring node process errors
  startNodeProcessErrorMonitor()

  // register providers
  await registerProviders()

  // generate graphql middleware
  const graphqlServer = await generateGraphqlServer()

  // start express server
  await start(graphqlServer)
}

main()
