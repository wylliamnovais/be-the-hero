const crypto = require('crypto');
const connect = require('../database/connection');

module.exports = {
    
    async create(request, response) {
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;
        
        const [id] = await connect('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return response.json({id});
    },

    async list (request, response)  {

        const {page = 1} = request.query;

        const [count] = await connect('incidents').count();

        const ongs = await connect('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ])
        .limit(5)
        .offset((page - 1) * 5);

        response.header('X-Total_count', count['count(*)']);
        return response.json(ongs);
    },
  
    async delete (request, response)  {
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connect('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted'});
        }

        await connect('incidents').where('id', id).delete();
        return response.status(204).send();
    }

};