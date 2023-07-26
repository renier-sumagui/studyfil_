import CircularProgress from '@mui/material/CircularProgress';

export function AbsoluteCircular() {
    return (
        <div 
            className="flex alignCenter justifyCenter " 
            style={{ 
                position: 'absolute', 
                width: '100%', 
                height: '100%', 
                top: '0', 
                left: '0', 
                zIndex: 9
            }}
        >
            <CircularProgress />
        </div>
    )
}