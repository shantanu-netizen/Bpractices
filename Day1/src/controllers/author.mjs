import authorModel from "../model/author.mjs";
const create = async (req, res) => {
    try {
        let data = req.body
        let author = await authorModel.create(data)
        return res.status(201).send({message:"created",data:author})
    } catch (error) {
        if (error.message.includes("duliplacate")) {
            res.status(400).send({ message: "duliplactes error" })
        } else if (error.message.includes("validation")) {
            res.status(400).send({ message: "validation error" })
        } else {
            res.status(500).send({ message: "internal server error" }
                
            )
        }
    }
}