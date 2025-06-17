import React from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';

const StyledButton = styled(Button)(({ theme, fullWidth }) => ({
  backgroundColor: '#0F1B4C',
  color: '#fff',
  fontWeight: '700',
  fontSize: '14px',
  cursor: 'pointer',
  padding: '0.5rem 1.25rem',
  borderRadius: '7px',
  textTransform: 'none',
  display: 'block',
  border: '2px solid transparent',
  width: fullWidth ? '100%' : 'auto',
  "&:hover": {
    backgroundColor: '#fff',
    color: '#0F1B4C',
    borderColor: '#0F1B4C',
  },
  [theme.breakpoints.down('md')]: {
    margin: '0 auto 24px',
    width: fullWidth ? '90%' : 'auto',
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: '24px',
    width: fullWidth ? '90%' : 'auto',
  },
}));

const CustomSubmitButton = ({
  backgroundColor = '#0F1B4C',
  color = '#fff',
  buttonText,
  welcomeBtn,
  guideBtn,
  getStartedBtn,
  fullWidth = false,
}) => {
  return (
    <StyledButton
      type="submit"
      fullWidth={fullWidth}
      sx={{
        backgroundColor,
        color,
        "&:hover": {
          backgroundColor: color,
          color: backgroundColor,
          borderColor: backgroundColor,
        }
      }}
    >
      {buttonText}
    </StyledButton>
  );
};

export default CustomSubmitButton;
