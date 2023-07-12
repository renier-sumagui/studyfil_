import { useState, useRef, useEffect } from 'react';
import { AlertsCss } from 'stylesheets/alerts';

export function BadWordsAlert() {

    return (
        <div id="success-alert" className={AlertsCss.badWordsAlert}>Bad words are prohibited!</div>
    )
}