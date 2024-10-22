import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { yooDto } from './yoomoney.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from 'src/schemas/transaction.schema';

@Injectable()
export class YoomoneyService {
  constructor(
    @InjectModel(Transaction.name) private transaction1: Model<Transaction>,
  ) {
    console.log('YoomoneyService initialized');
  }

  async newPayment(dto: yooDto): Promise<Transaction> {
    const payment = await axios({
      method: 'POST',
      url: 'https://api.yookassa.ru/v3/payments',
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': Date.now(),
      },
      auth: {
        username: '', // Your Y Kasss ShopId
        password: '', //  Your Y Kasss Paymenr Token
      },
      data: {
        amount: {
          value: dto.cash,
          currency: 'RUB',
        },
        capture: true,
      },
    });

    if (!payment) {
      const transaction = await this.transaction1.create({
        amount: Number(dto.cash),
        status: 'Canceled',
        method: 'Yoomoney',
      });

      await transaction.save();
      return transaction;
    }

    const transaction = await this.transaction1.create({
      amount: Number(dto.cash),
      status: 'Payed',
      method: 'Yoomoney',
    });

    await transaction.save();
    return transaction;
  }
}
