
const express = require("express");

const router = express.Router()


const GlobalData = require("../models/topics.model")


router.get("/", async function (req, res) {

    return res.status(200).json("hello")
})

router.post("/", async function (req, res) {
    const text = req.body.text;

    try {
        if (!text) {
            return res.status(400).json({
                error: true,
                message: "Please add required data"
            })
        }

        const comment = await GlobalData.create()
    }

    catch (err) {
        console.log(err);
        return res.status(400).json({
            error: "Something went wrong"
        })
    }

})


module.exports = router;