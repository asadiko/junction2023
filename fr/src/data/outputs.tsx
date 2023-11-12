import { BlogIcon, ECommerceIcon, LandingIcon, BusinessPageIcon } from "../assets";
import blog from '../assets/blog.jpg'
import ecommerce from '../assets/ecommerce.jpg'
import landing from '../assets/landing.png'
import business from '../assets/business.jpeg'

export const outputs = [
    { name: 'Blog', icon: <BlogIcon />, value: 'blog', img: blog },
    { name: 'E-Commerce', icon: <ECommerceIcon />, value: 'eCommerce', img: ecommerce },
    { name: 'Landing', icon: <LandingIcon />, value: 'landing', img: landing },
    { name: 'Business Page', icon: <BusinessPageIcon />, value: 'businessPage', img: business },
]