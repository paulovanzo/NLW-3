import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';
import OrphanageView from '../views/Orphanages_view'

import Orphanage from '../models/Orphanage';

export default {

    async show( req: Request, res: Response ){
        const { id } = req.params;

        const orphanagesRepository = getRepository(Orphanage)

        const orphanages = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        })

        return res.json(OrphanageView.render(orphanages))

    },

    async index( req: Request, res: Response ){
        const orphanagesRepository = getRepository(Orphanage)

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        })

        return res.json(OrphanageView.renderMany(orphanages))

    },

    async create( req: Request, res: Response ){
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = req.body;
        console.log(req.body)
    
        const orphanagesRepository = getRepository(Orphanage)
    
        const reqImg = req.files as Express.Multer.File[];

        const images = reqImg.map( image => {
            return { path: image.filename };
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        };

        const schema = yup.object().shape({
            name: yup.string().required(),
            latitude: yup.number().required(),
            longitude: yup.number().required(),
            about: yup.string().required().max(300),
            instructions: yup.string().required(),
            opening_hours: yup.string().required(),
            open_on_weekends: yup.boolean().required(),
            images: yup.array(
                yup.object().shape({
                    path: yup.string().required()
            }))
        })

        await schema.validate(data, {
            abortEarly: false,
        })

        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage)
    
        return res.status(201).json(orphanage)
    }
}