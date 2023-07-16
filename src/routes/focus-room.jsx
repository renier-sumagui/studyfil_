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

const chunk = (arr) => {
    const newArr = [];
    while (arr.length) {
        newArr.push(arr.splice(0, 3));
    }
    return newArr;
}

function ParticipantView(props) {
    const micRef = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);

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

    return (
    <div style={{ width: '350px', border: '1px solid black', borderRadius: '10px', padding: '5px' }}>
        <p><strong>{displayName}</strong> | Webcam: {webcamOn ? "ON" : "OFF"} | Mic: {micOn ? "ON" : "OFF"}</p>
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
            height={'200px'}
            width={'100%'}
            onError={(err) => {
				console.log(err, "participant video error");
            }}
        />
        )}
    </div>
    );
}
  
function Controls() {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
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
				{mic ? <MicIcon className="videoCallIcons" /> : <MicOffIcon className="videoCallIcons" />}
			</button>
			<button 
				onClick={() => {
					toggleWebcam()
					setCam(prev => !prev)
				}}
				className="iconButton videoCallButtons"
			>
				{cam ? <CameraAltIcon className="videoCallIcons" /> : <NoPhotographyIcon className="videoCallIcons" />}
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
        	<button onClick={joinMeeting}>Join</button>
        )}
      </div>
    );
}
  
  

function JoinScreen({ updateMeetingId, getMeetingAndToken }) {
    return (
        <div>
            <input type="text" placeholder="Enter MeetingId" onChange={(e) => updateMeetingId(e.target.value)} />
            <button onClick={getMeetingAndToken}>Join</button>
            <button onClick={getMeetingAndToken}>Create Meeting</button>
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
                micEnabled: true,
                webcamEnabled: true,
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