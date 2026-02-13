const express = require("express");
const router = express.Router();
const Person = require("../Person");
router.get('/', async (req, res) => {           // FETCH DATA FROM DATABASE USING POSTMAN
  try {
    const response = await Person.find();
    console.log(' data fetched successfully');
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching person data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {       // SEND DATA IN DATABASE USING POSTMAN
  try {
    const data = (req.body);
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log('Data saved successfully');
    res.status(201).json(response);
  } catch (error) {
    console.error('Error saving person data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:workType', async (req, res) => { // Fetch persons by workType (chef, waiter, manager) PARAMETRISED API CALLS
  try {
    const workType = req.params.workType;

    if (workType === 'chef' || workType === 'waiter' || workType === 'manager') {
      const response = await Person.find({ workType });
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: 'Invalid workType parameter' });
    }
  } catch (error) {
    console.error('Error fetching person data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE PERSON DATA BY ID
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,          // Return updated document
        runValidators: true // Validate schema
      }
    );

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('Person data updated successfully');
    res.status(200).json(response);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE PERSON DATA BY ID
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }
    console.log('Person data deleted successfully');
    res.status(200).json({ message: 'Person data deleted successfully' });
  } catch (error) {
    console.error('Error deleting person data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;