import Mountain1 from "../assets/1.jpg"
import Mountain2 from "../assets/2.jpg"
import Mountain3 from "../assets/4.jpg"
import Mountain4 from "../assets/5.jpg"
import DestinationData from "./DestinationData";
import "./DestinationStyles.css";
const Destination =() =>{
    return(
        <div className="destnation">
            <h1>Popular Destination</h1>
            <p>Tour give you the Opportunity to explore</p>

            <DestinationData
            className="first-des"
            heading="MUMBAI"

            text="Mumbai (formerly called Bombay) is a densely populated city on India’s west coast. 
            A financial center, it's India's largest city. On the Mumbai Harbour waterfront stands the iconic Gateway 
            of India stone arch, built by the British Raj in 1924. Offshore, 
            nearby Elephanta Island holds ancient cave temples dedicated to the Hindu god Shiva. 
            The city's also famous as the heart of the Bollywood film industry."

                  img1={Mountain1}
                  img2={Mountain2} 

            />

<DestinationData
className="first-des-reverse"
            heading="KERELA"

            text="Kerala, a state on India's tropical Malabar Coast, has nearly 600km of Arabian Sea shoreline.
             It's known for its palm-lined beaches and backwaters, a network of canals. Inland are the Western Ghats, 
             mountains whose slopes support tea, coffee and spice plantations as well as wildlife. National parks like Eravikulam and Periyar,
             plus Wayanad and other sanctuaries, are home to elephants, langur monkeys and tigers."

                  img1={Mountain3}
                  img2={Mountain4} 

            />

            
        </div>
    )
}

export default Destination