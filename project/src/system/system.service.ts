import { Injectable } from '@nestjs/common';
import { Details } from './details.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SystemService {
    constructor(@InjectRepository(Details) private myRepo: Repository<Details>){}

    meowMeow(){
        return "Returning meow meow"
    }

    mawMaw(){
        return "Returning maw maw"
    }
}
