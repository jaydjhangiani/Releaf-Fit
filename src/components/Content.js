import React from 'react'

function Content({props, val}) {
    return (
        <div
         style={{
            background: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            width: '100%',
        }}
        >
            <div
                style={{
                    display: 'flex',
                    marginBottom: '5px',
                    alignItems: 'center',
                }}
            >
                <div style={{
                    width: '0.7rem',
                    height: '0.7rem',
                    marginRight: '5px',
                    borderRadius: '50%',
                    background: val === 5 ? '#9575' : 'indigo'    
               }}>

                </div>
               <p style={{
                   fontSize: '0.6rem',
               
               }}>{val === 4 ? "Light Sleep" : "Deep Sleep"}</p>
               </div>
            <div><p style={{
                   width: '102px' ,
                   fontSize: '0.8rem',
                   padding: '1px 0px'
               }}> Duration: {`${props.substr(0,2) === '00' ? '' : `${props.substr(0,2)} hr &`} ${props.substr(3,2)} mins`} </p></div>
        </div>
    )
}

export default Content