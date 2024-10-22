import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from 'src/schemas/transaction.schema';
import Stripe from 'stripe';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  providers: [
    {
      provide: 'STRIPE',
      useFactory: () => {
        return new Stripe(process.env.STRIPE, {
          apiVersion: '2024-06-20',
        });
      },
    },
    StripeService,
  ],
  exports: [StripeService],
})
export class StripeModule {}
