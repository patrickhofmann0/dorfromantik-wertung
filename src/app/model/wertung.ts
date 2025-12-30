import { v4 as uuidv4 } from 'uuid';


export class Wertung {
    punkteAuftragFeld!: number;

    id: string = uuidv4();
    dateCreated!: Date ;
    
}