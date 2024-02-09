import Hero from "../component/Hero";
import Navbar from "../component/Navbar";
import AboutImg from "../assets/9.jpg"
import Footer from "../component/Footer";
import ContactForm from "../component/ContactForm";
function Contact(){
    return(
        <>
         <Navbar/>
        <Hero
        cName="hero-mid"
        heroImg={AboutImg} 
        title="Contact"
        
        btnClass="hide"
         
        />
        <ContactForm/>
      
      
      
        </>
    );
}

export default Contact;