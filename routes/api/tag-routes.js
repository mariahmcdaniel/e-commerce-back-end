const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
          through: ProductTag,
        },
      ],
    });
    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
          through: ProductTag,
        },
      ],
    });
    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag found with this id!' });
    }
    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id },
    });
    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

module.exports = router;
