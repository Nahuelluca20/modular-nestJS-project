import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

// import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from '@/products';
import { UsersModule } from '@/users';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import config from './config';
// import { lastValueFrom } from 'rxjs';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    ProductsModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'TASKS',
    //   useFactory: async (http: HttpService) => {
    //     const request = http.get('https://jsonplaceholder.typicode.com/todos');
    //     const tasks = await lastValueFrom(request);
    //     return tasks.data;
    //   },
    //   inject: [HttpService],
    // },
  ],
})
export class AppModule {}
