const express = require('express');
const { getDb } = require('../db');
const { ObjectId } = require('mongodb');

const router = express.Router();

// Create tournament
router.post('/', async (req, res) => {
  const tournament = { ...req.body, teams: [] };
  const db = getDb();
  const result = await db.collection('tournaments').insertOne(tournament);
  res.status(201).json(result.ops?.[0] || tournament);
});

// Get all tournaments
router.get('/', async (req, res) => {
  const db = getDb();
  const tournaments = await db.collection('tournaments').find().toArray();
  res.json(tournaments);
});

// Get one tournament
router.get('/:id', async (req, res) => {
  const db = getDb();
  const tournament = await db.collection('tournaments').findOne({ _id: new ObjectId(req.params.id) });
  if (!tournament) return res.status(404).json({ message: 'Not found' });
  res.json(tournament);
});

// Add a team to a tournament
router.post('/:id/teams', async (req, res) => {
  const db = getDb();
  const team = { ...req.body };
  const result = await db.collection('tournaments').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $push: { teams: team } }
  );
  res.json({ message: 'Team added', result });
});

module.exports = router; // ✅ make sure you're exporting this