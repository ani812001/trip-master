import Hero from "../component/Hero";
import Navbar from "../component/Navbar";
import AboutImg from "../assets/3.jpg"
import Footer from "../component/Footer";
import TripService from "../component/TripService";
function Service({email}){
    return(
       <>
         <Navbar/>
        <Hero
        cName="hero-mid"
        heroImg={AboutImg}
        title="Service"
        
        btnClass="hide"
         
        />
        <TripService email={email}/>
        <Footer/>
       </>
    )

}

export default Service;