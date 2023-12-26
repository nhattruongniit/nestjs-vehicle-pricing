import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateReportDto } from './dtos/create-report.dto';

import { Report } from './reports.entity';
import { User } from 'src/users/users.entity';
@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(body: CreateReportDto, user: User) {
    const report = this.repo.create(body);
    report.user = user;
    return this.repo.save(report);
  }
}
