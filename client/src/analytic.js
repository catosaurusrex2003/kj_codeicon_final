import React, { useState } from 'react'

function Eachimage(props) {
    // C:\Users\mohammed mehdi\OneDrive\Desktop\hackathons\kj_codeicon_final\server\analytic_images
    return (
        <>
            <img src = {require(`./analytic_images/${props.link}`)} className="anal_img" />
        </>
    )
}

function Analytic() {

    const [Images_array, setImages_array] = useState([])

    async function get_string() {
        fetch("http://localhost:5000/anal")
            .then(data => {
                return data.json();
            })
            .then(post => {
                console.log(post)
                setImages_array(post)
            });
    }

    return (
        <div className='analytics_master'>
            {Images_array.map(each => <Eachimage key = {Math.random()} link = {each} />)}
            <button className='re_evaluate' onClick={get_string}>Get analytics</button>
        </div>
    )
}

export default Analytic