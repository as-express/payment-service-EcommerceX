
import { BadRequestException, Injectable } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';
import { paypalDto } from './paypal.dto';
import { Transaction } from 'src/schemas/transaction.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PaypalService {
  private client: paypal.core.PayPalHttpClient;

  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {
    const clientId = process.env.PAYPAL_CLIENT;
    const clientSecret = process.env.PAYPAL_SECRET;

    const environment = new paypal.core.SandboxEnvironment(
      clientId,
      clientSecret,
    );
    this.client = new paypal.core.PayPalHttpClient(environment);
  }

  async newPayment(dto: paypalDto): Promise<Transaction> {
    const req = new paypal.orders.OrdersCreateRequest();
    await req.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: dto.amount,
          },
        },
      ],
    });

    try {
      const response = await this.client.execute(req);

      const status = response.result.status;
      let transactionStatus;

      if (status === 'COMPLETED') {
        transactionStatus = 'Payed';
        console.log('Success');
      } else {
        transactionStatus = 'Canceled';
        console.log('Canceled');
      }

      const transaction = await this.transactionModel.create({
        amount: dto.amount,
        status: transactionStatus,
        method: 'PayPal',
      });

      return response; 
    } catch (error) {
      console.error('Error creating PayPal payment:', error);

      const transaction = await this.transactionModel.create({
        amount: dto.amount,
        status: 'Canceled',
        method: 'PayPal',
      });

      throw new BadRequestException('Error in Payment');
    }
  }
}
