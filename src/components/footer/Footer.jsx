import React from 'react'
import "./footer.css"
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <main className='footer-container'>
    <footer className='footer'>
        <div className='footer-grid'>
            <div className='footer-aromia'>

            <h3 className='footer-title'>Aromia</h3>
            <ul className='footer-routes'>
                <Link>Shop all</Link>
                <Link>For Body</Link>
                <Link>For Home</Link>
                <Link>About</Link>
                <Link>Contact</Link>
            </ul>
            </div>
            <div className='footer-help'>

            <h3 className='footer-title'>Help</h3>
            <ul className='footer-links'> 
                <a href='#'>Store policy</a>
                <a href='#'>Payment methods</a>
                <a href='#'>FAQ</a>
                
                
            </ul>
            </div>
            <div className='footer-contact'>

            <h3 className='footer-title'>Contact</h3>
            <ul className='footer-list'>
                <li>123-456-7890</li>
                <li>aromia@aromia.ro</li>
            </ul>
            </div>
            <div className='footer-subscribe'>
                <h3 className='footer-title'>Newsletter</h3>
                <label>Enter Email*</label>
                <input className='footer-input' type="email" name="email" id="email" placeholder='Email'/>
                <button className='footer-button' type="submit">SUBSCRIBE</button>
            </div>
        </div>
    </footer>
    </main>
  )
}

export default Footer
