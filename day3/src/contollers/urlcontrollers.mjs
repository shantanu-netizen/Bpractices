import express from "express";
import url from "../models/url.mjs";
const shortenurl = async (req, res)=>{
    const { longurl } = req.body
    if (!longurl) {
        return res.status(400).send({message:"Enter longurl"})
    }
    if (!validurl.isurilongurl) {
        return res.status(400).send({message:"Invalid longurl"})
    }
    try {
        let url = await url.findOne({ longurl })
        if (url) {
            return res.send({shorturl: url.short})
        }
        const urlcode = shortid.generate().lowercase()
        const shorturl = `${req.protocol}://${req.get("host")}/url/${urlcode}`
        url = new url({
            urlcode,
            longurl,
            shorturl,
        })
        await url.save();
        caches.set(urlcode, shorturl)
        res.send({shorturl})
    } catch (error) {
        console.error(err);
        res.status(500).send({ error: "Server error" });
    }
}