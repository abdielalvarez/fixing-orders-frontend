import React from 'react'

function Cards({ handleMaintain }) {
    return (
        
        <div className="col mb-4">
            <div className="card h-100">
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
                <div className="card-footer" style={{ cursor: 'pointer' }} onClick={() => handleMaintain('params')}>
                    <small className="text-muted">Dar mantenimiento</small>
                </div>
            </div>
        </div>
    )
}

export default Cards
