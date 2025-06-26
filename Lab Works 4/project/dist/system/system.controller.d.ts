import { SystemService } from './system.service';
import { examinee } from './dto/examinee.dto';
export declare class SystemController {
    private readonly systemServ;
    constructor(systemServ: SystemService);
    meowMeow(): string;
    mawMaw(validation: examinee): string;
}
