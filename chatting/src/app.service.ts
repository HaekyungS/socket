import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '김루이 건강 챙겨~~~';
  }
}
