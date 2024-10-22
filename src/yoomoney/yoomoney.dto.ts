import { IsNotEmpty } from 'class-validator';

export class yooDto {
  @IsNotEmpty()
  cash: number;
}
