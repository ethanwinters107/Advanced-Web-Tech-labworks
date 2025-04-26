import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemService {
    meowMeow(){
        return "Returning meow meow"
    }

    mawMaw(){
        return "Returning maw maw"
    }
}
