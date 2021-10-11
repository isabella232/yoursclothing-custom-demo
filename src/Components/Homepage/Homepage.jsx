import React from 'react'
import { useSelector } from 'react-redux';

// IMPORT AASSET
import headerUp from '../../Assets/Images/headerUp.png';
import img1 from '../../Assets/Images/img1.png';
import img2 from '../../Assets/Images/img2.png';
import img3 from '../../Assets/Images/img3.png';
import img4 from '../../Assets/Images/img4.png';
import rbVideo from '../../Assets/Videos/rbVideo.webm'
import footer from '../../Assets/Images/footer.png';

import {CarouselHome, CarouselHomeHalloween} from './Carousel';


const Homepage = () => {
    const {searchVisible, catOne, catTwo} = useSelector(state => state.visibility)
    return (
        <div className={`homepage-wrapper ${searchVisible || catOne || catTwo ? 'hidden' : 'active'}`}>
            <div>
                <img src={headerUp} alt="home" />
            </div>
            <div>
                <img src={img1} alt="home" />
            </div>
            <div className="carouselHome">
                <h2>It's coat season...</h2>
                <CarouselHome/>
            </div>
            <div className="carouselHome">
                <h2>...But also Halloween Celebration !</h2>
                <CarouselHomeHalloween/>
            </div>
            <div>
                <img src={img2} alt="home" />
            </div>
            <div>
                <img src={img3} alt="home" />
            </div>
            <div>
                <img src={img4} alt="home" />
            </div>
            <div>
                <img src={footer} alt="home" />
            </div>
        </div>
    );
}

export default Homepage;