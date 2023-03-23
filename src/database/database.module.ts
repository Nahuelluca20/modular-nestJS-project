import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
const API_KEY = '1234657';
const API_KEY_PROD = 'PROD1234657dsadasdas';
import { MongoClient } from 'mongodb';
import config from '@/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configServise: ConfigType<typeof config>) => {
        const { user, password, host, port, connection, dbName } =
          configServise.mongo;
        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'production' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configServise: ConfigType<typeof config>) => {
        const { user, password, host, port, connection, dbName } =
          configServise.mongo;
        const uri = `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);

        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
