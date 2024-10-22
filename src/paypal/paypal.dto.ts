import { IsNotEmpty } from 'class-validator';

export class paypalDto {
  @IsNotEmpty()
  amount: string;
}
