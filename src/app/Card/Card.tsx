'use client';

import { useState } from 'react';
import './card.css'
import custom from './custom.module.css'
import clsx from 'clsx';

function Card() {
    const[expanded, setExpanded] = useState(false);
    return (  
        <div className={clsx('card', {
            [custom.card] : expanded
        })}>Card</div>
    );
}

export default Card;