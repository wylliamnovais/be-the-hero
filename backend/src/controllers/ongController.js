const crypto = require('crypto');
const connect = require('../database/connection');

module.exports = {
    
    async create(request, response) {
        
        const {name, email, whatsapp, city, uf} = request.body;
        const id = crypto.randomBytes(4).toString('HEX');
        
        await connect('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return response.json({id});
    },

    async list (request, response)  {
        const ongs = await connect('ongs').select('*');
        return response.json(ongs);
    }
};