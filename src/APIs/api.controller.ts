/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Query } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('search')
export class ApiController {
    constructor(private readonly apiService:ApiService) {}
    @Get()
    async searchContent(@Query('filter') filter: string) {
        return await this.apiService.searchContent(filter);
    }
}
