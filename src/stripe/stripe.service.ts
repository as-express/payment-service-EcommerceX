import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { stripeDto } from './stripe.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from 'src/schemas/transaction.schema';
import { Model } from 'mongoose';

@Injectable()
export class StripeService {
  constructor(
    @Inject('STRIPE') private readonly stripe: Stripe,
    @InjectModel(Transaction.name) private transaction1: Model<Transaction>,
  ) {}

  async newPayment(dto: stripeDto): Promise<Transaction> {
    try {
      const payment = await this.stripe.paymentIntents.create({
        amount: dto.amount,
        currency: 'USD',
      });

      const transaction = await this.transaction1.create({
        amount: dto.amount,
        status: payment ? 'Paid' : 'Canceled',
        method: 'Stripe',
      });

      return transaction;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error in payment function',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
