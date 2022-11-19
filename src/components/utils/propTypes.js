import PropTypes from "prop-types";

export const IngredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  calories: PropTypes.string.isRequired,
  proteins: PropTypes.string.isRequired,
  fat: PropTypes.string.isRequired,
  carbohydrates: PropTypes.string.isRequired,
});
