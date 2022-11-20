import PropTypes from "prop-types";

export const IngredientPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  image_large: PropTypes.string,
  price: PropTypes.number,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
});
