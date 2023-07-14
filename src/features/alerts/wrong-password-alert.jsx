import { useState, useRef, useEffect } from 'react';
import { AlertsCss } from 'stylesheets/alerts';

export function WrongPasswordAlert() {

    return (
        <div id="success-alert" className={AlertsCss.badWordsAlert}>Invalid code</div>
    )
}