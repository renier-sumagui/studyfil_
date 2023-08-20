import Skeleton from '@mui/material/Skeleton';
import classnames from 'classnames';
import { MessagesCss } from 'stylesheets/messages';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';


export function MessageSkeleton() {
    const { groupId } = useParams();
    const backgroundColor = '#E4E6EB';

    const [skeletonArray, setSkeletonArray] = useState();

    useEffect(() => {
        const randomMessageCount = Math.random();
        const messageHeight = 35;
        let tempArray = [];
        
        for (let index = 0; index < 5; index++) {
            const randomWidth = Math.floor(Math.random() * 600) + 100;
            const randomHeight = randomWidth >= 600 ? Math.floor((Math.floor(Math.random() * 105) + 35) / 35) * 35 : 35;
            const nextWidth = Math.floor(Math.random() * 600) + 100;
            const value = Math.floor(Math.random() * 2);
            const hasNext =  value ? (
                <Skeleton 
                    animation="wave" 
                    className={MessagesCss.messageContent} 
                    variant="rectangle" 
                    width={nextWidth} 
                    height={35}
                    sx={{ bgcolor: backgroundColor }} 
                />
            ) : null;

            if (index % 2 === 0) {
                const randUserWidth = Math.floor((Math.random() * 100)) + 80;
                tempArray.push(
                    <>
                        <div className={MessagesCss.messageBox} style={{ marginTop: '10px' }}>
                            <div className={classnames(MessagesCss.userInfoContainer, 'flex alignCenter gap5')}>
                                <div className={MessagesCss.avatarSkeleton}>
                                    <Skeleton 
                                        animation="wave" 
                                        variant="circular" 
                                        width={'100%'} 
                                        height={'100%'} 
                                    />
                                </div>
                                <span className={MessagesCss.userName}>
                                    <Skeleton animation="wave" variant="rectangle" width={randUserWidth} height={16} />
                                </span>
                            </div>
                            <Skeleton 
                                animation="wave" 
                                className={MessagesCss.messageContent} 
                                variant="rectangle" 
                                width={randomWidth} 
                                height={randomHeight} 
                                sx={{ bgcolor: backgroundColor }} 
                            />
                        </div>
                        {hasNext}
                    </>
                );
            } else {
                tempArray.push(
                    <Skeleton 
                        key={index}
                        animation="wave" 
                        className={MessagesCss.currentUser} 
                        variant="rectangle" 
                        width={randomWidth} 
                        height={randomHeight} 
                        sx={{ bgcolor: backgroundColor }} 
                    />
                );
            }
        }

        setSkeletonArray(tempArray);
    }, [groupId])

    return (
        <div className={MessagesCss.skeletonWrapper}>
            {skeletonArray && skeletonArray}
        </div>
    )
}