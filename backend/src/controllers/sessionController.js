const connect = require('../database/connection');

module.exports = {
    async create(request, response) {
        const value = request.body;

        const ong = await connect('ongs')
            .where('id', value.id)
            .select('name').first();


        if (!ong) {
            return response.status(400).json({erros: 'No Ong found with ID'});
        }

        return response.json(ong);
    }
};