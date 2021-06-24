import React from 'react'
import '../css/LoadingAnim.css'

function LoadingAnim({ position, transform, borderRadius, top, right, border, width, height}) {
    return (        
        <div style={{ transform, position, borderRadius, top: top, right: right, borderTop: border, borderLeft: border, width, height}} className='load-circle'></div>
    )
}

export default LoadingAnim
