const express = require('express')
const router = express.Router()
const Team = require('../models/team')

// Getting all ---------------------------------------------------------------
router.get('/', async (req, res) => {
    try{
        const teams =  await Team.find()
        res.json(teams)
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

// Getting One ---------------------------------------------------------------
router.get('/:id', getTeam, (req, res) => {
    res.json(res.team)
})

// Getting a teams win / loss ratio -------------------------------------------
router.get('/getRatio/:id', getTeam, (req, res) => {
 
    const ratio = res.team.wins / res.team.losses
    res.json(ratio)
})

// Creating One --------------------------------------------------------------
router.post('/', async (req, res) => {
    const team = new Team({
        name: req.body.name,
        city: req.body.city,
        wins: req.body.wins,
        losses: req.body.losses
    })

    try{
        const newTeam = await team.save()
        res.status(201).json(newTeam)
    }catch(err){
        res.status(400).json({ message: err.message })
    }
})

// Updating One --------------------------------------------------------------
router.patch('/:id', getTeam, async (req, res) => {
    
    if (req.body.name != null){
        res.team.name = req.body.name
    }
    if (req.body.city != null){
        res.team.city = req.body.city
    }
    if (req.body.wins != null){
        res.team.wins = req.body.wins
    }
    if (req.body.losses != null){
        res.team.losses = req.body.losses
    }

    try{
        const updatedTeam = await res.team.save()
        res.json(updatedTeam)
    }catch(err){
        res.status(400).json({ message: err.message })
    }
})

// Deleting One --------------------------------------------------------------
router.delete('/:id', getTeam, async (req, res) => {
    try{
        await res.team.remove()
        res.json({ message: "Deleted Team" })
    }catch(err){
        res.status(400).json({ message: err.message })

    }
})

// utility function
async function getTeam(req, res, next){
    let team

    try{
        team = await Team.findById(req.params.id)
        if (team == null){
            return res.staus(404).json({ message: "Cannot Find Team" })
        }

    }catch(err){
        res.status(500).json({ message: err.message })
    }

    res.team = team
    next()
}


module.exports = router
