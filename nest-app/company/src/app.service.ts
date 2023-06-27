import { Injectable } from '@nestjs/common';
import { createCompanyDto } from './dto/create-company.dto';
import { SupabaseService } from './supabase/supabase.service';

@Injectable()
export class AppService {

constructor(private supabaseService: SupabaseService) {}


  getHello(): string {
    return 'Hello World!';
  }

  async saveCompany(company: createCompanyDto){

    const { error } =  await this.supabaseService.client
    .from('company')
    .insert([
      {
         name: company.name,
         email: company.email,
         address: company.address,
         city: company.city,
         zipcode: company.zipcode,
         message: company.message,
         number: company.number
      }
    ]);

    if (error) {
        throw error;
    }

    return { statusCode : 201, message : "Created"}
  }
}
