import 'bulma/css/bulma.min.css';
import styles from './Card.module.scss';
import { Link } from 'react-router-dom';

function Card(props) {
    return (
        <>
                <div className={`card ${styles.passageCard}`}>
                <div className='card-content'>
                    <div className='subtitle'>
                        {props.reference}
                    </div>
                    <div className='content'>
                        {props.text}
                    </div>
                    
                </div>
                <footer id='cardReadContainer' className='card-footer'>
                    <span className='card-footer-item' >
                            <Link to='#'>Read</Link>
                    </span>
                </footer>
           </div>
            
        </>
    );
}

export default Card;
