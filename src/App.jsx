import * as React from 'react';
import 'stylesheets/App.css';
import 'stylesheets/normalize.css';
import { Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Root, SignInPage, SignUpPage, ChooseTopicsPage } from 'pages/';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export default function App() {
    return (
        <div>app</div>
    );
}