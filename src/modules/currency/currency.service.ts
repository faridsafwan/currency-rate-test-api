import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { ICurrency } from './schemas/currency.schema';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectModel('Currency')
    private readonly currencyModel: Model<ICurrency>,
    private httpService: HttpService,
  ) {}

  async findAll(): Promise<any> {
    return await this.currencyModel.find().exec();
  }

  async findOne(currency: string) {
    return await this.currencyModel.findOne({ currency: currency });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const allCurrency = [
      'USD_MYR,MYR_USD',
      'USD_EUR,EUR_USD',
      'MYR_EUR,EUR_MYR',
    ];
    try {
      for (const iterator of allCurrency) {
        this.httpService
          .get('https://free.currconv.com/api/v7/convert', {
            params: {
              q: iterator,
              compact: 'ultra',
              apiKey: '20e98cd18d617b702441',
            },
          })
          .toPromise()
          .then(async (res) => {
            console.log(res.data, 'UPDATE CURRENCY');
            const { data } = res;
            for (const [key, value] of Object.entries(data)) {
              const filter = { currency: key };
              const update = { spotRate: Number(value) };
              const updatedCurrency = await this.currencyModel.findOneAndUpdate(
                filter,
                update,
              );
              if (!updatedCurrency) {
                await this.currencyModel.create({
                  currency: key,
                  spotRate: Number(value),
                });
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
