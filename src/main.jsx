import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import 'stylesheets/App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Circular } from 'features/loading';
import { SideLinkContextProvider } from 'context/';

import { Root, SignUpPage, ErrorPage, SignInPage, ChooseTopicsPage, TermsAndConditionsPage, AboutUsPage, ForgotPasswordPage } from 'pages/';
import { MessageMain } from 'features/messages';
import { AccountInformation, PasswordSettings, TopicsSettings } from 'features/settings';

const ExploreGroupsRoute = lazy(() => import('routes/explore-groups-route.jsx'));
const JoinedGroupsRoute = lazy(() => import('routes/joined-groups-route.jsx'));
const MessagesRoute = lazy(() => import('routes/messages-route.jsx'));
const GroupForumRoute = lazy(() => import('routes/group-forum-route.jsx'));
const PostRoute = lazy(() => import('routes/post-route.jsx'));
const SettingsRoute = lazy(() => import('routes/settings-route.jsx'));
const GroupSettingsRoute = lazy(() => import('routes/group-settings-route.jsx'));
const FeedbackRoute = lazy(() => import('routes/feedback-route.jsx'));
const GroupSearchResultsRoute = lazy(() => import ('routes/group-search-results-route.jsx'));
const FocusRoom = lazy(() => import ('routes/focus-room.jsx'));
const AbuseRoute = lazy(() => import ('routes/abuse-route.jsx'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <Suspense fallback={<Circular />}><Root /></Suspense>,
        errorElement: <ErrorPage />,
        children: [
        {
            path: '/',
            element: <Suspense fallback={<Circular />}><ExploreGroupsRoute /></Suspense>
        },
        {
            path: '/settings',
            element: <Suspense fallback={<Circular />}><SettingsRoute /></Suspense>,
            children: [
                {
                    path: '/settings/account',
                    element: <Suspense fallback={<Circular />}><AccountInformation /></Suspense>
                },
                {
                    path: '/settings/password', 
                    element: <Suspense fallback={<Circular />}><PasswordSettings /></Suspense>
                },
                {
                    path: '/settings/topics',
                    element: <Suspense fallback={<Circular />}><TopicsSettings /></Suspense>
                }
            ]
        },
        {
            path: '/groups/explore',
            element: <Suspense fallback={<Circular />}><ExploreGroupsRoute /></Suspense>
        },
        {
            path: '/groups/joined',
            element: <Suspense fallback={<Circular />}><JoinedGroupsRoute /></Suspense>
        },
        {
            path: 'groups/:groupId',
            element: <Suspense fallback={<Circular />}><GroupForumRoute /></Suspense>
        },
        {
            path: 'groups/:groupId/post/:postId',
            element: <Suspense fallback={<Circular />}><PostRoute /></Suspense>
        },
        {
            path: 'groups/:groupId/settings',
            element: <Suspense fallback={<Circular />}><GroupSettingsRoute /></Suspense>
        },
        {
            path: 'groups/search',
            element: <Suspense fallback={<Circular />}><GroupSearchResultsRoute /></Suspense>
        },
        {
            path: '/messages',
            element: <Suspense fallback={<Circular />}><MessagesRoute /></Suspense>,
            children: [
            {
                path: '/messages/:groupId',
                element: <Suspense fallback={<div>Loading...</div>}><MessageMain /></Suspense>
            }
            ]
        },
        {
            path: '/focusroom',
            element: <Suspense fallback={<Circular />}><FocusRoom /></Suspense>
        },
        {
            path: '/feedback',
            element: <Suspense fallback={<Circular />}><FeedbackRoute /></Suspense>
        },
        {
            path: '/abuse',
            element: <Suspense fallback={<Circular />}><AbuseRoute /></Suspense>
        }
        ]
    },
    {
        path: '/signup',
        element: <Suspense fallback={<Circular />}><SignUpPage /></Suspense>
    },
    {
        path: '/signup/topics',
        element: <Suspense fallback={<Circular />}><ChooseTopicsPage /></Suspense>
    },
    {
        path: '/signin',
        element: <Suspense fallback={<Circular />}><SignInPage /></Suspense>
    },
    {
        path: 'legal/terms',
        element: <Suspense fallback={<Circular />}><TermsAndConditionsPage /></Suspense>
    },
    {
        path: '/about',
        element: <Suspense fallback={<Circular />}><AboutUsPage /></Suspense>
    },
    {
        path: '/signin/identify/',
        element: <Suspense fallback={<Circular />}><ForgotPasswordPage /></Suspense>
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SideLinkContextProvider>
            <RouterProvider router={router}>
                <Suspense fallback={<Circular />}>
                    {router}
                </Suspense>
            </RouterProvider>
        </SideLinkContextProvider>
    </LocalizationProvider>
);