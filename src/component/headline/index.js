import React from 'react';
import PropTypes from 'prop-types';

function Headline (props) {
  const { header, desc } = props;

  if (!header) {
    return null;
  }

  return (
    <div data-test="HeadlineComponent">
      <h1 data-test="header">{header}</h1>
      <p data-test="desc">
        {desc}
      </p>
    </div>
  )
}

Headline.propTypes = {
  header: PropTypes.string,
  desc: PropTypes.string,
}

export default Headline;