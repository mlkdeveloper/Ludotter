import {Controller, Get, UseFilters, UsePipes, ValidationPipe} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import {RpcValidationFilter} from "./filters/rpc-exception.filter";
import {addDto} from "./dto/add.dto";
import {fetchDto} from "./dto/fetch.dto";
import {deleteDto} from "./dto/delete.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'visio_hello' })
  getHello(data: fetchDto) {
    return this.appService.getHello(data);
  }

  @MessagePattern({ cmd: 'visio_all' })
  getAll() {
    return this.appService.getAll();
  }

  @MessagePattern({ cmd: 'visio_add' })
  @UsePipes(ValidationPipe)
  @UseFilters(new RpcValidationFilter())
  add(add: addDto) {
    return this.appService.add(add);
  }

  @MessagePattern({ cmd: 'visio_delete' })
  @UsePipes(ValidationPipe)
  @UseFilters(new RpcValidationFilter())
  deleteVisio(deleteVisio: deleteDto) {
    return this.appService.deleteVisio(deleteVisio);
  }
}
