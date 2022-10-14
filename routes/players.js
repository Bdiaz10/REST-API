const express = require('express') // need express
const router = express.Router() // the express router
const Player = require('../models/player')

// Getting all ---------------------------------------------------------------
router.get('/', async (req, res) => {
    try{
        const players = await Player.find()
        res.json(players)

    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

// Getting One ---------------------------------------------------------------
router.get('/:id', getPlayer, (req, res) => {
    res.json(res.player)
})

// Creating One --------------------------------------------------------------
router.post('/', async (req, res) => {
    const player = new Player({
        name: req.body.name,
        team: req.body.team,
        number: req.body.number
    })

    try{
        const newPlayer = await player.save()
        res.status(201).json(newPlayer)
    }catch(err){
        res.status(400).json({ message: err.message })
    }
})


// Updating One --------------------------------------------------------------
router.patch('/:id', getPlayer, async (req, res) => {
    if (req.body.name != null){
        res.player.name = req.body.name
    }
    if (req.body.team != null){
        res.player.team = req.body.team
    }

    try{
        const updatedPlayer = await res.player.save()
        res.json(updatedPlayer)
    }catch(err){
        res.status(400).json({ message: err.message })
    }
})

// Deleting One --------------------------------------------------------------
router.delete('/:id', getPlayer, async (req, res) => {
    try{
        await res.player.remove()
        res.json({ message: 'Deleted Player'})
    }catch(err){
        res.status(500).json({ message: err.message })

    }
})




// Middle ware----------------------------------------------------------------
// utility function to get a player
// when the requests uses the id
async function getPlayer(req, res, next) {
    let player

    try{
        player = await Player.findById(req.params.id)
        if (player == null){
            return res.status(404).json({ message: "Cannot Find Player" })
        }
    }catch(err){
        return res.status(500).json({ message: err.message})
    }

    res.player = player
    next()
}


module.exports = router