import { useEffect, useMemo, useRef, useState } from 'react';
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';
import { 
    MeetingProvider,
    MeetingConsumer,
    useMeeting,
    useParticipant,
} from '@videosdk.live/react-sdk';

import { createMeeting, getToken } from 'src/api.js';
import ReactPlayer from 'react-player';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import { useUserContext } from 'context/';
import { FocusRoomCss } from 'stylesheets/focus-room';

const chunk = (arr) => {
    const newArr = [];
    while (arr.length) {
        newArr.push(arr.splice(0, 3));
    }
    return newArr;
}

function ParticipantView(props) {
    const micRef = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(props.participantId);
    const [videoIcon, setVideoIcon] = useState(<NoPhotographyIcon className="verticalAlignBaseline" />);
    const [micIcon, setMicIcon] = useState(<MicOffIcon className="verticalAlignBaseline" />);

    const videoStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    useEffect(() => {
        if (micRef.current) {
            if (micOn && micStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(micStream.track);

            micRef.current.srcObject = mediaStream;
            micRef.current
                .play()
                .catch((error) =>
                console.error("videoElem.current.play() failed", error)
                );
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);

    useEffect(() => {
        if (webcamOn) {
            setVideoIcon(<CameraAltIcon className="verticalAlignBaseline" />)
        } else {
            setVideoIcon(<NoPhotographyIcon className="verticalAlignBaseline" />);
        }
    }, [webcamOn])

    useEffect(() => {
        if (micOn) {
            setMicIcon(<MicIcon className="verticalAlignBaseline" />);
        } else {
            setMicIcon(<MicOffIcon className="verticalAlignBaseline" />);
        }
    }, [micOn])

    return (
    <div style={{ width: '340px', border: '1px solid #2E5A88', borderRadius: '10px', padding: '5px', height: '230px', background: ' #CDE3F9' }}>
        <p style={{ textAlign: 'center' }}><strong>{displayName}</strong> | {videoIcon} | {micIcon}</p>
        <audio ref={micRef} autoPlay playsInline muted={isLocal} />
        {webcamOn && (
        <ReactPlayer
            playsinline
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={videoStream}
            height={'90%'}
            width={'100%'}
            onError={(err) => {
				console.log(err, "participant video error");
            }}
        />)}
    </div>
    );
}
  
function Controls() {
    const { leave, toggleMic, toggleWebcam, localWebcamOn, localMicOn } = useMeeting();
	const [mic, setMic] = useState(true)
	const [cam, setCam] = useState(true)

	useEffect(() => {
		return () => leave()
	}, [])

    return (
		<div style={{ 
				textAlign: 'center',
				position: 'fixed',
				left: '55%',
				bottom: '10px'
			}}
		>
			<button 
				onClick={() => leave()}
				className="iconButton videoCallButtons"
			>
				<CallEndIcon className="videoCallIcons dangerIcon" />
			</button>
			<button 
				onClick={() => { 
					toggleMic() 
					setMic(prev => !prev)
				}}
				className="iconButton videoCallButtons"
			>
				{localMicOn ? <MicIcon className="videoCallIcons" /> : <MicOffIcon className="videoCallIcons" />}
			</button>
			<button 
				onClick={() => {
					toggleWebcam()
					setCam(prev => !prev)
				}}
				className="iconButton videoCallButtons"
			>
				{localWebcamOn ? <CameraAltIcon className="videoCallIcons" /> : <NoPhotographyIcon className="videoCallIcons" />}
			</button>
		</div>
    );
  }


function MeetingView(props) {
    const meeting = useMeeting();
    const [joined, setJoined] = useState(null);
    const { join, participants } = useMeeting({
      onMeetingJoined: () => {
        setJoined("JOINED");
      },
      onMeetingLeft: () => {
        props.onMeetingLeave();
      },
    });
    const joinMeeting = async () => {
      setJoined("JOINING");
      join();
    };

    return (
      <div className="container">
        <h3>Meeting Id: {props.meetingId}</h3>
        {joined && joined == "JOINED" ? (
			<div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
				<Controls />
				{[...participants.keys()].map((participantId) => (
				<ParticipantView
					participantId={participantId}
					key={participantId}
				/>
				))}
			</div>
        ) : joined && joined == "JOINING" ? (
        	<p>Joining the meeting...</p>
        ) : (
        	<button onClick={joinMeeting} className={FocusRoomCss.meetingButton}>Join</button>
        )}
      </div>
    );
}
  
  

function JoinScreen({ updateMeetingId, getMeetingAndToken }) {
    return (
        <div className="flex alignCenter justifyCenter" style={{ height: '100%' }}>
            <div className={FocusRoomCss.createMeetingContainer}>
                <input type="text" placeholder="Enter Meeting ID" onChange={(e) => updateMeetingId(e.target.value)} />
                <button onClick={getMeetingAndToken} className={FocusRoomCss.meetingButton}>Join</button>
                <button onClick={getMeetingAndToken} className={FocusRoomCss.meetingButton}>Create Meeting</button>
            </div>
        </div>
    )
}

function FocusRoom() {
    const [token, setToken] = useState(null);
    const [meetingId, setMeetingId] = useState(null);
	const { user } = useUserContext();

    const getMeetingAndToken = async () => {
        const token = await getToken();
        setMeetingId(meetingId ? meetingId : (await createMeeting({ token })));
        setToken(token);
    }

    const updateMeetingId = (meetingId) => {
        setMeetingId(meetingId);
    };

    const onMeetingLeave = () => {
        setMeetingId(null);
    }

    return token && meetingId ? (
        <MeetingProvider
            config={{
                meetingId,
                micEnabled: false,
                webcamEnabled: false,
                name: `${user.username}`,
            }}
            token={token}
            joinWithoutInteraction={true}
        >
            <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        </MeetingProvider>
        ) : (
            <JoinScreen updateMeetingId={updateMeetingId} getMeetingAndToken={getMeetingAndToken} />
        );
};
export default FocusRoom;