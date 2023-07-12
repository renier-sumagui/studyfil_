import { useState, useRef, useEffect } from 'react';
import { AlertsCss } from 'stylesheets/alerts';

export function SuccessAlert({ message }) {
    const successRef = useRef(null)

    useEffect(() => {
        const element = document.getElementById('success-alert');
        element.style.display = 'block';
    }, [])

    return (
        <div id="success-alert" className={AlertsCss.successAlert}>
            { message }
        </div>
    )
}