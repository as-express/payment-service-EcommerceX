import {
  Body,
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { PaypalService } from './paypal/paypal.service';
import { StripeService } from './stripe/stripe.service';
import { YoomoneyService } from './yoomoney/yoomoney.service';
import { paypalDto } from './paypal/paypal.dto';
import { stripeDto } from './stripe/stripe.dto';
import { yooDto } from './yoomoney/yoomoney.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly paypalService: PaypalService,
    private readonly stripeServie: StripeService,
    private readonly yoomoneyService: YoomoneyService,
  ) {}

  @MessagePattern('get')
  getHello(): string {
    return 'Hello this work successful';
  }

  @MessagePattern('paypal')
  @UsePipes(new ValidationPipe())
  async newPaypal(@Body() dto: paypalDto) {
    return this.paypalService.newPayment(dto);
  }

  @MessagePattern('stripe')
  @UsePipes(new ValidationPipe())
  async newStripe(@Body() dto: stripeDto) {
    return this.stripeServie.newPayment(dto);
  }

  @MessagePattern('yoomoney')
  @UsePipes(new ValidationPipe())
  async newYoomoney(@Body() dto: yooDto) {
    return this.yoomoneyService.newPayment(dto);
  }
}
