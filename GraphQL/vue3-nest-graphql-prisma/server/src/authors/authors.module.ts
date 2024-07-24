import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [AuthorsService, PrismaService],
  exports: [AuthorsService],
})
export class AuthorsModule {}