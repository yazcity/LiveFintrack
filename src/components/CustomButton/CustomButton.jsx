import React from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';

const StyledButton = styled(Button)(({ theme, welcomeBtn, getStartedBtn, guideBtn }) => ({
  backgroundColor: '#0F1B4C', // default, can be overridden by sx prop
  color: '#fff',
  fontWeight: '700',
  fontSize: '14px',
  cursor: 'pointer',
  padding: '0.5rem 1.25rem',
  borderRadius: '7px',
  textTransform: 'none',
  display: 'block',
  border: '2px solid transparent',
  '&:hover': {
    backgroundColor: '#fff',
    color: '#0F1B4C',
    borderColor: '#0F1B4C',
  },
  [theme.breakpoints.down('md')]: {
    margin: (welcomeBtn || getStartedBtn) ? theme.spacing(0, 'auto', 3, 'auto') : undefined,
    width: (welcomeBtn || getStartedBtn) ? '90%' : undefined,
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: guideBtn ? theme.spacing(3) : undefined,
    width: guideBtn ? '90%' : undefined,
  },
}));

const CustomButton = ({
  backgroundColor,
  color,
  buttonText,
  welcomeBtn,
  guideBtn,
  getStartedBtn,
  onClick,
  ...props
}) => {
  return (
    <StyledButton
      onClick={onClick}
      welcomeBtn={welcomeBtn}
      guideBtn={guideBtn}
      getStartedBtn={getStartedBtn}
      sx={{
        backgroundColor: backgroundColor,
        color: color,
        '&:hover': {
          backgroundColor: color,
          color: backgroundColor,
          borderColor: backgroundColor,
        },
      }}
      {...props}
    >
      {buttonText}
    </StyledButton>
  );
};

export default CustomButton;
