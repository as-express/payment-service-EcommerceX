import { IsNotEmpty } from 'class-validator';

export class stripeDto {
  @IsNotEmpty()
  amount: number;
}
