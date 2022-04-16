const Reserv = require('../models/Reservation');

module.exports.add = async (req,res) => {
    const userId = req.params.id;
    //const newReserv = new Reserv(req.body);
    try{
        let reserv = await Reserv.findOne({To: {$gte:req.body.From},From: {$lte:req.body.From}, Date1 : req.body.Date1,Table:req.body.Table});
        console.log(req.body);
        console.log(reserv);
        if(!reserv)
        {
            const newReserv = await Reserv.create({
                userId,
                From:req.body.From,
                To:req.body.To,
                Date1:req.body.Date1,
                Table:req.body.Table,
              });
              newR = await newReserv.save();
              return res.status(201).send(newR);
       
        }
        else
        {
            return res.status(406).send("alredy exist");
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send(err);
    }
}