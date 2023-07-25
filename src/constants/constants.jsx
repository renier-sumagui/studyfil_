import { useCountries } from 'hooks/';

import ExploreIcon from '@mui/icons-material/Explore';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';

import Groups from '@mui/icons-material/Groups';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import VideoCallIcon from '@mui/icons-material/VideoCall';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';

import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import FeedbackIcon from '@mui/icons-material/Feedback';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';

import ReportIcon from '@mui/icons-material/Report';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

export const SETTINGS_ACTION = {
    CHANGE_USERNAME: 'changeUsername',
    CHANGE_FIRST_NAME: 'changeFirstName',
    CHANGE_LAST_NAME: 'changeLastName',
    CHANGE_EMAIL: 'changeEmail',
    CHANGE_OLD_PASSWORD: 'changeOldPassword',
    CHANGE_NEW_PASSWORD: 'changeNewPassword',
    CHANGE_CONFIRM: 'changeConfirm'
}

export const SIDEBAR_LINKS1 = [
    {
        name: "Study Groups",
        id: "explore",
        path: "/groups/explore",
        solid: <ExploreIcon />,
        outlined: <ExploreOutlinedIcon />
    },
    {
        name: "Your Groups",
        id: "groups",
        path: "/groups/joined",
        solid: <Groups />,
        outlined: <GroupsOutlinedIcon />
    },
    {
        name: "Messages",
        id: "messages",
        path: "/messages",
        solid: <ChatBubbleIcon />,
        outlined: <ChatBubbleOutlineOutlinedIcon />
    },
    {
        name: "Focus Room",
        id: "focusRoom",
        path: "/focusroom",
        solid: <VideoCallIcon />,
        outlined: <VideoCallOutlinedIcon />
    }
]

export const SIDEBAR_LINKS2 = [
    {
        name: "Settings",
        id: "settings",
        path: "/settings",
        solid: <SettingsIcon />,
        outlined: <SettingsOutlinedIcon />
    },
    {
        name: "Feedback",
        id: "feedback",
        path: "/feedback",
        solid: <FeedbackIcon />,
        outlined: <FeedbackOutlinedIcon />
    },
    {
        name: "Report Abuse",
        id: "abuse",
        path: "/abuse",
        solid: <ReportIcon />, 
        outlined: <ReportGmailerrorredIcon />
    },
];