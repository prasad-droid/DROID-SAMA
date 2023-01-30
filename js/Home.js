import Animes from "./Animes.js";
import Sidebar from "./sidebar.js";
import Navbar from "./Navbar.js";


export default function Home() {
  return `${Navbar()}
  <div class="row ">

  ${Animes()}
  
  ${Sidebar()}
  
  </div>
  `;
}
