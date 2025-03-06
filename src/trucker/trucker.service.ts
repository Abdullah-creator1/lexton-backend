import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTruckerDto } from './dto/create-trucker.dto';
import { UpdateTruckerDto } from './dto/update-trucker.dto';

@Injectable()
export class TruckerService {
    constructor(private readonly db: DatabaseService) { }

    async getAll(page: number = 1, search?: string, limit: number = 10) {
        const offset = (page - 1) * limit;
        let query = `SELECT * FROM truckers WHERE is_deleted = FALSE`;
        const params: any[] = [];

        if (search) {
            query += ` AND (name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1)`;
            params.push(`%${search}%`);
        }

        const totalCountQuery = `SELECT COUNT(id) AS total FROM truckers WHERE is_deleted = FALSE 
                                 ${search ? 'AND (name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1)' : ''}`;
        const totalCountResult = await this.db.query(totalCountQuery, params);
        const totalTruckers = parseInt(totalCountResult.rows[0]?.total || "0", 10);

        query += ` ORDER BY id LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
        params.push(limit, offset);

        const data = await this.db.query(query, params);
        return {
            page,
            totalTruckers,
            totalPages: Math.ceil(totalTruckers / limit),
            totalRecords: data.rows.length,
            records: data.rows,
        };
    }

    async createTrucker(dto: CreateTruckerDto) {

        const result = await this.db.query(
            `INSERT INTO truckers (
                company_name, company_legal_name, company_other_name, rating, first_name, last_name, phone, cell, 
                email_1, email_2, accounting_email_3, accounting_email_4, state, zip_code, city, group_department_port_terminal, 
                address_1, address_2, dot_number, mc_number, tariff_number, website, status, scac_code, if_si, hazardous, 
                reefer, customs_bonded, over_weight, full_truckload, less_than_truckload, container_drayage, out_of_gauge, 
                iso_tanks, trans_loading, flatbed, open_tops, residential, heavy_haul, conestoga, triaxles, warehouse, 
                storage, long_haul, documentation, notes, is_deleted
            ) 
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, 
                $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, 
                $47
            ) RETURNING *`,
            [
                dto.company_name, dto.company_legal_name, dto.company_other_name, dto.rating, dto.first_name,
                dto.last_name, dto.phone, dto.cell, dto.email_1, dto.email_2, dto.accounting_email_3, dto.accounting_email_4,
                dto.state, dto.zip_code, dto.city, dto.group_department_port_terminal, dto.address_1, dto.address_2, dto.dot_number,
                dto.mc_number, dto.tariff_number, dto.website, dto.status, dto.scac_code, dto.fi_si, dto.hazardous, dto.reefer,
                dto.customs_bonded, dto.over_weight, dto.full_truckload, dto.less_than_truckload, dto.container_drayage, dto.out_of_gauge,
                dto.iso_tanks, dto.trans_loading, dto.flatbed, dto.open_tops, dto.residential, dto.heavy_haul, dto.conestoga, dto.triaxles,
                dto.warehouse, dto.storage, dto.long_haul, dto.documentation, dto.notes, false
            ]
        );
        let truckerData = result.rows[0];
        if (!dto.browse) {
            return result.rows[0];
        }
        truckerData['media'] = [];

        if (!dto.browse || dto.browse.length === 0) {
            return truckerData;
        }
        const insertPromises = dto.browse.map(async (element) => {
            let query = `INSERT INTO truckers_media (trucker_id, media_id) VALUES ($1, $2) RETURNING *`;
            let params = [truckerData.id, element];
            const mediaData = await this.db.query(query, params);
            return mediaData.rows[0];
        });        
        truckerData.media = await Promise.all(insertPromises);
        return truckerData;
        
    }


    async updateTrucker(id: number, dto: UpdateTruckerDto) {
        
        const checkDeleted = await this.db.query(
            `SELECT id FROM truckers WHERE id = $1 AND is_deleted = false`,
            [id]
        );

        if (checkDeleted.rowCount === 0) {
            throw new Error('Truckers record not found or has been deleted');
        }
      
        const result = await this.db.query(
            `UPDATE truckers 
    SET company_name = $1, company_legal_name = $2, company_other_name = $3, rating = $4, first_name = $5, last_name = $6, 
        phone = $7, cell = $8, email_1 = $9, email_2 = $10, accounting_email_3 = $11, accounting_email_4 = $12, state = $13, 
        zip_code = $14, city = $15, group_department_port_terminal = $16, address_1 = $17, address_2 = $18, dot_number = $19, 
        mc_number = $20, tariff_number = $21, website = $22, status = $23, scac_code = $24, if_si = $25, 
        hazardous = $26, reefer = $27, customs_bonded = $28, over_weight = $29, full_truckload = $30, less_than_truckload = $31, 
        container_drayage = $32, out_of_gauge = $33, iso_tanks = $34, trans_loading = $35, flatbed = $36, open_tops = $37, 
        residential = $38, heavy_haul = $39, conestoga = $40, triaxles = $41, warehouse = $42, storage = $43, long_haul = $44, 
        documentation = $45, notes = $46 
    WHERE id = $47 AND is_deleted = false 
    RETURNING *`,
            [
                dto.company_name, dto.company_legal_name, dto.company_other_name, dto.rating, dto.first_name,
                dto.last_name, dto.phone, dto.cell, dto.email_1, dto.email_2, dto.accounting_email_3, dto.accounting_email_4, dto.state,
                dto.zip_code, dto.city, dto.group_department_port_terminal, dto.address_1, dto.address_2, dto.dot_number, dto.mc_number,
                dto.tariff_number, dto.website, dto.status, dto.scac_code, dto.fi_si, dto.hazardous, dto.reefer, dto.customs_bonded,
                dto.over_weight, dto.full_truckload, dto.less_than_truckload, dto.container_drayage, dto.out_of_gauge, dto.iso_tanks,
                dto.trans_loading, dto.flatbed, dto.open_tops, dto.residential, dto.heavy_haul, dto.conestoga, dto.triaxles, dto.warehouse,
                dto.storage, dto.long_haul, dto.documentation, dto.notes, id
            ]
        );

        return result.rows[0];
    }

    async deleteTrucker(id: number) {
        await this.db.query('UPDATE truckers SET is_deleted = TRUE WHERE id = $1 RETURNING *', [id]);
        return { message: 'Trucker deleted successfully' };
    }
}