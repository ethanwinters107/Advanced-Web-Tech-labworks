import { Details } from './details.entity';
import { Repository } from 'typeorm';
export declare class SystemService {
    private myRepo;
    constructor(myRepo: Repository<Details>);
    meowMeow(): string;
    mawMaw(): string;
}
