import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schemas/admin.schema';
import mongoose from 'mongoose';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin.name)
        private adminModel: mongoose.Model<Admin>,
    ){}
    
    /**
     * Retrives all admins . 
     * @returns Promise<Admin[]> 
     */
    async findAll(): Promise<Admin[]>{
        //Find all admins
        const admins = await this.adminModel.find()
        return admins;  
    }

    /**
     * Creates a new admin
     * @param admin Admin
     * @returns Promise<Admin>
     */
    async create(admin:Admin): Promise<Admin>{
        //Create a new admin
        const res = await this.adminModel.create(admin)
        return res;
    }

    /**
     * find an admin By ID
     * @param id 
     * @returns Promise<Admin>
     */
    async findById(id:string):Promise<Admin>{
        //Find admin by ID
        const cid = await this.adminModel.findById(id)
        if(!cid){
            //If admin not found , throw NotFoundException
            throw new NotFoundException('Admin not found')
        }   
        return cid;
    }

    /**
     *Updates an admin by ID . 
     * @param id string 
     * @param cid
     * @returns Promise<Admin>
     */
    async updateById(id:string,cid:Admin):Promise<Admin>{
        //Update admin by ID
        return await this.adminModel.findByIdAndUpdate(id,cid,{
            new :true ,
            runValidators: true
        });
    }
    
    /**
     * Deletes an admin by ID.
     * @param id string
     * @returns Promise<Admin>
     */
    async deleteById(id:string):Promise<Admin>{
        //Delete admin by ID
        return await this.adminModel.findByIdAndDelete(id);
    }    
}
