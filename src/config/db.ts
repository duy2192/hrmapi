import {
    Connection,
    ConnectionOptions,
    createConnection as createTypeOrmConnection,
    getConnection,
    getConnectionOptions,
  } from "typeorm";
  
  type EntitiesAndMigrationsOpts = Pick<
    ConnectionOptions,
    "entities" | "migrations"
  >;

  export const createConnection = async (): Promise<Connection> => {
    if(process.env.NODE_ENV==='development'){
      return createTypeOrmConnection()
    }
    const importAllFunctions = (
      requireContext: __WebpackModuleApi.RequireContext
    ) => 
      requireContext
        .keys()
        .sort()
        .map((filename) => {
          const required = requireContext(filename);
          return Object.keys(required).reduce((result, exportedKey) => {
            const exported = required[exportedKey];
            if (typeof exported === "function") {
              return result.concat(exported);
            }
            return result;
          }, [] as any);
        })
        .flat();
    
    const entitiesViaWebpack: NonNullable<
      EntitiesAndMigrationsOpts["entities"]
    > = importAllFunctions(require.context("../models/", true, /\.ts$/));
    const baseConnectionOptions = await getConnectionOptions();
    const connectionOptions: ConnectionOptions = {
      ...baseConnectionOptions,
      entities: entitiesViaWebpack,
    };
    return createTypeOrmConnection(connectionOptions);
  };