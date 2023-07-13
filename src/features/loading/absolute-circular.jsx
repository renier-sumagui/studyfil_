import CircularProgress from '@mui/material/CircularProgress';

export function AbsoluteCircular() {
    return (
        <div className="flex alignCenter justifyCenter " style={{ position: 'absolute', width: '95%', height: '90%'}}>
            <CircularProgress />
        </div>
    )
}