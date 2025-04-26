import { IsNotEmpty } from "class-validator";

export class examinee{
    @IsNotEmpty({message: 'Please Fill the ID'})
    id:string
}