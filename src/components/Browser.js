import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

const alignCenter = {
  display: 'flex',
  alignItems: 'center',
};

const Browser = ({ children, ...props }) => {
  const commonProps = {
    width: 12,
    height: 12,
    borderRadius: '50%',
    ml: 1,
  };
  return (
    <Box
      position={'relative'}
      borderRadius={8}
      overflow={'hidden'}
      display={'flex'}
      flexDirection={'column'}
      {...props}
    >
      <Box
        bgcolor={'common.white'}
        boxShadow={'inset 0 -1px 0 rgba(0,0,0,0.16)'}
        py={1}
        {...alignCenter}
      >
        <Box {...commonProps} bgcolor={'grey.400'} />
        <Box {...commonProps} bgcolor={'grey.300'} />
        <Box {...commonProps} bgcolor={'grey.300'} />
      </Box>
      <Box height={'100%'} display={'flex'} css={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

Browser.propTypes = {
  children: PropTypes.node,
};
Browser.defaultProps = {
  children: null,
};

export default Browser;
