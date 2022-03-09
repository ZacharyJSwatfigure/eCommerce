const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
      const categoryFill = await Category.findAll({ include: Product}); 
      res.status(200).json(categoryFill);
  } catch (e) {
      res.json(e);
  }

});

router.get('/:id', async (req, res) => {
  try {
    const categoryFill = await Category.findByPk(req.params.id, { include: Product}); 
    
    if (categoryFill) {
      res.status(200).json(categoryFill);
    } else {
      res.status(404).json({ message: 'No category Matches your input' });
      return;
    }
} catch (e) {
    res.json(e);
}
});

router.post('/', async (req, res) => {
  try {
    const categoryFill = await Category.create(req.body); 
    res.status(200).json(categoryFill);
} catch (e) {
    res.json(e);
}
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }});

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category matches that Input!' });
      // return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
