import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('all')
  findAll() {
    return this.currencyService.findAll();
  }

  @Get()
  findOne(@Query() query) {
    console.log(query, 'query');

    return this.currencyService.findOne(query.q);
  }
}
