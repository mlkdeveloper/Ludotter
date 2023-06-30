import { Controller, Post, Get, Inject, Param, Body, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('company')
export class CompanyController {

  constructor(@Inject('COMPANY_SERVICE') private client: ClientProxy) {}

  @Get('companies')
  getCompanies() {
    return this.client.send({ cmd: 'company_getCompanies' },{});
  }
  
  @Get('request')
  getRequestCompany() {
    return this.client.send({ cmd: 'company_getRequestCompany' },{});
  }

  @Post('saveCompanyAdmin')
  saveCompanyAdmin(@Body() company:any){
    return this.client.send({ cmd: 'company_saveCompanyAdmin' }, company);
  }
  
  @Get('getCompanyAdmin')
  getCompanyAdmin() {
    return this.client.send({ cmd: 'company_getCompanyAdmin' },{});
  }

  @Post('')
  saveCompany(@Body() company: any) {
    return this.client.send({ cmd: 'company_saveCompany' }, company);
  }

  @Patch('accept/:id')
  acceptCompany(@Param('id') id: string){
    return this.client.send({ cmd: 'company_acceptCompany' },id);
  }

  @Delete(':id')
  deleteCompany(@Param('id') id: string){
    return this.client.send({ cmd: 'company_deleteCompany' },id);
  }

}