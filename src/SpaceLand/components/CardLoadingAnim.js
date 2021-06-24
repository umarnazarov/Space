import React from 'react'
import '../css/CardLoadingAnim.css'

function CardLoadingAnim() {
    const cards = []
    for (let i = 0; i <= 7; i++){
        cards.push(
            <div key={i} className="anim-container">
                <div className="anim-content">
                    <div className='anim-img'></div>
                    <div className="anim-texts">
                        <div className='anim-text'></div>
                        <div className='anim-text'></div>
                        <div className='anim-text'></div>
                        <div className='anim-button'></div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='anim-card'>
            {cards.map(c => c)}
        </div>
    )
}

export default CardLoadingAnim
