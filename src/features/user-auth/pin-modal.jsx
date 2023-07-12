import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, Box } from '@mui/system';
import Modal from '@mui/base/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import submitPin from './submit-pin.js';

export function PinModal({ open, handleOpen, handleClose }) {
    const [pin, setPin] = React.useState('');
    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const navigate = useNavigate();

    const disabledButton = <Button onClick={handleClose} sx={{ mt: 1, borderRadius: '20px', padding: '0 20px' }} disabled variant="outlined">Confirm</Button>;
    const enabledButton = <Button onClick={handleSubmit} sx={{ mt: 1, borderRadius: '20px', padding: '0 20px' }} variant="outlined">Confirm</Button>;


    /**
     * Submit pin, 
     * if the code matched, close the modal and navigate to choose topics
     */
    async function handleSubmit() {
        const result = await submitPin(pin);
        if (!result.success) {
            setSuccess(false);
            setError(true);
        } else {
            setError(false);
            // close modal and navigate to choose topics page
            navigate('/signup/topics');
        }
    }

    return (
        <div>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                slots={{ backdrop: StyledBackdrop }}
                onBackdropClick={() => {
                        setError(false);
                        handleClose()
                    }
                }
            >
                <Grid 
                    container 
                    direction="column"
                    alignItems="center"
                    sx={style}
                >
                    {error && <p style={{ color: '#DC3545' }}>Wrong code, please try again.</p>}
                    <h2 style={{margin: 0}}>Email Confirmation</h2>
                    <p style={{margin: '0 0 20px 0'}}>We've sent you an email, please check your inbox or spam and enter the code below.</p>
                    <Box component="form">
                        <TextField
                            fullWidth
                            size="small"
                            id="email-pin"
                            label="Pin"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            autoFocus
                        />
                    </Box>
                    {pin.length > 0 ? enabledButton : disabledButton}
                </Grid>
            </StyledModal>
        </div>
    );
}

const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
        <div
        className={clsx({ 'MuiBackdrop-open': open }, className)}
        ref={ref}
        {...other}
        />
    );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
  width: 350,
  borderRadius: '12px',
  padding: '16px 10px',
  backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
  boxShadow: `0px 2px 24px ${theme.palette.mode === 'dark' ? '#000' : '#383838'}`,
  textAlign: `center`
});

const TriggerButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 6px 12px;
  line-height: 1.5;
  background: transparent;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[100] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:focus-visible {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }
  `,
);