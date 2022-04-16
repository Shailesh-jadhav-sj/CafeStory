const Reserv = require('../models/Reservation');

module.exports.add = async (req,res) => {
    const userId = req.params.id;
    const newReserv = new Reserv(req.body);
    newReserv.save().then(Reserv => res.json(Reserv));
}