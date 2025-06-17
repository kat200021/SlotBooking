const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// GET /api/people/occupations
router.get('/occupations', async (req, res) => {
  const { data, error } = await supabase
    .from('availability')
    .select('occupation', { distinct: true })
    .not('occupation', 'is', null);

  if (error) {
    console.error('Error fetching occupations:', error.message);
    return res.status(500).json({ error: error.message });
  }

  // Get unique occupations
  const uniqueOccupations = [...new Set(data.map(item => item.occupation))].filter(Boolean);
  res.json(uniqueOccupations);
});

module.exports = router;

// GET /api/people
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('availability') 
    .select('id, person_name, occupation');

  if (error) {
    console.error('Error fetching people:', error.message);
    return res.status(500).json({ error: error.message });
  }

  const formatted = data.map((person) => ({
    id: person.id,
    name: person.person_name,
    occupation: person.occupation
  }));

  res.json(formatted);
});


