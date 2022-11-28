import React from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data = [
    'https://i.pinimg.com/originals/b1/b8/f3/b1b8f376be175241456bde87d0fa76ef.png',
    'https://static.vecteezy.com/system/resources/previews/003/287/968/original/realistic-perfume-advertisement-vector.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/66716d83112735.5d32a8efebe15.jpg',
    'https://cdn.dribbble.com/users/5739021/screenshots/16801648/hp-pavilion-gaming-laptop-advertisement-poster-design-2.jpg',
    'https://i.pinimg.com/originals/cd/10/9c/cd109c6fb4e11071eee176a78c53afe9.jpg',
    'https://adsofbd.com/wp-content/uploads/2018/07/Regal.jpg'
]

const HomeSlider = () => {
    const settings = {
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 6000,
        cssEase: "ease-in"
    };
    return (
        <div className='w-11/12 lg:w-3/4 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center py-12'>
            <div className='w-5/6 '>
                <p className='text-4xl lg:text-7xl font-light'>we bring <br/><span className='text-[#FFAE5D] font-bold'> your demand</span><br/> at your doorstep!</p>
            </div>
            <div>
                <Slider {...settings} className='-z-20'>
                    {
                        data.map((img, id) => {
                            return <img src={img} key={id} className='h-96 lg:h-[600px] w-full rounded-lg' />
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}

export default HomeSlider