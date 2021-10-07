import React from 'react';

function Landing(props) {
    return (
        <div className='landing'>
            <img src='https://www.berksiu.org/wp-content/uploads/2018/08/aditya-chinchure-494048-unsplash.jpg' alt='landing'/>
            <div className='overlay'></div>
            <div className='landing-modal'>
                <h2>Pyploto</h2>
                <h3>The social app made for music discovery</h3>
                <p>Our goal is to help people connect with others through music and share what they have been listening to lately</p>
                <a href='/login'>Login</a>
            </div>
        </div>
    );
}

export default Landing;