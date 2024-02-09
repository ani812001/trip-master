import Destination from "../component/Destination";
import Footer from "../component/Footer";
import Hero from "../component/Hero";
import Navbar from "../component/Navbar";

// import Trip from "../component/Trip";
function Home(){
    return(
       <>
       <Navbar/>
       <Hero
       cName="hero"
       heroImg="https://images.unsplash.com/photo-1636469804970-33183abae494?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGVsZXBoYW50JTIwb24lMjBiZWFjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
       title="Your Story"
       text="Choose Your Favourite Destination."
       buttonText="Travel Plan "
       btnClass="show"
        
       />
       <Destination/>
       {/* <Trip/> */}
       <Footer/>
       </> 
      
    );

}

export default Home;