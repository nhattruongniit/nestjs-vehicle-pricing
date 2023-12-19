import { Body, Controller, Post, UseGuards } from '@nestjs/common';

//dto
import { CreateReportDto } from './dtos/create-report.dto';

// services
import { ReportsService } from './reports.service';

// auth
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  // @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto) {
    return this.reportService.create(body);
  }
}
