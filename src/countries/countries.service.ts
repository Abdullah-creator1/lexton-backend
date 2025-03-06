import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CountriesService {

    constructor(private readonly db: DatabaseService) {}

    async getCountries(){
        const data = await this.db.query('SELECT id,country FROM countries');
        return data.rows;
    }
}
