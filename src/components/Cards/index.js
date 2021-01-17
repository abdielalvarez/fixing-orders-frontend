import React from 'react'

function Cards({ handleMaintain, data }) {

    function timeConverter(UNIX_timestamp){
        let date = new Date(UNIX_timestamp * 1000);
        let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        let year = date.getUTCFullYear();
        let month = months[date.getUTCMonth()];
        let day = date.getUTCDate();
        let time = `${day} ${month} ${year}`;
        return time;
    }

    return (
        <div className="col mb-4">
            <div
                className="card h-100"
                style={{
                    backgroundColor: data && data.inMaintenance ?
                    'rgba(15, 187, 255, 0.18)' : 'inherit'
                }}
            >
                {data.image ?
                    <img
                        src={data.image}
                        className="card-img-top"
                        alt={data.make}
                        style={{
                            height: 200,
                            objectFit: 'cover',
                            padding: 18,
                        }}
                    /> : null
                }
                
                <div className="card-body">
                    <h5>{data && data.make ? data.make : ''}</h5>
                    <small className="text-muted">{data && data.model ? data.model : ''}</small>
                    <p className="text-success">{data && data.nameToDeliver ? `Client: ${data.nameToDeliver}` : ''}</p>
                    <p className="card-text">{data && data.description ? `Description: ${data.description}` : ''}</p>
                    
                    {data && data.inMaintenance && data.estimateDate ?
                        <p className="card-text">
                            In maintenance, delivery day: <br /> {timeConverter(data.estimateDate)}
                        </p> : null
                    }
                </div>

                <div
                    className="card-footer"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleMaintain(data)}
                    data-toggle="modal"
                    data-target="#formModal"
                    data-whatever="@fat"
                >
                    <small className="text-muted">
                        {data.inMaintenance ? 'Stop maintenance': 'Give maintenance'}
                    </small>
                </div>
            </div>
        </div>
    )
}

export default Cards
