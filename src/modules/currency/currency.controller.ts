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
  async findOne(@Query() query) {
    const findCurrency = await this.currencyService.findOne(query.q);
    if (!findCurrency) {
      await this.currencyService.handleCron();
      return await this.currencyService.findOne(query.q);
    }
    return this.currencyService.findOne(query.q);
  }
}
