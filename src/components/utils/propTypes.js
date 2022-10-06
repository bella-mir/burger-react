import PropTypes from 'prop-types';

export const IngredientsPropTypes = PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    replyTo: PropTypes.number,
    text: PropTypes.string.isRequired
  });
  