import { Body, Controller, Post, UseGuards } from '@nestjs/common';

//dto
import { CreateReportDto } from './dtos/create-report.dto';

// services
import { ReportsService } from './reports.service';

// auth
// import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/users.entity';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  // @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    console.log(user);
    // return this.reportService.create(body, user);
  }
}
