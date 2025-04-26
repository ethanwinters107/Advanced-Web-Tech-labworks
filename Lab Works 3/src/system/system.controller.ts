import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { SystemService } from './system.service';
import { examinee } from './dto/examinee.dto';

@Controller('system')
export class SystemController {
    constructor(private readonly systemServ: SystemService) {}

@Get()
meowMeow()
{
    return this.systemServ.meowMeow()
}
@Post()
mawMaw(@Body(new ValidationPipe())validation:examinee)
{
    return this.systemServ.mawMaw()
}
}
