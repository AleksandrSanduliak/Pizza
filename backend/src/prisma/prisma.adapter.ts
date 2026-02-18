import { Injectable } from '@nestjs/common';
import {
  creationPrismaAdapter,
  creationPrismaAdapter1,
  updationPrismaAdapter,
} from './adapters-utilts';

@Injectable()
export class PrismaAdapter {
  constructor() { }

  private transformRecursively(data) { }

  toCreateNested(data) {
    return creationPrismaAdapter(data);
  }
  toUpdateNested(data) {
    return updationPrismaAdapter(data);
  }
}
