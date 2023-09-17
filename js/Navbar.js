export default function Navbar() {
  return `<nav
      class="navbar navbar-default navbar-expand-lg navbar-dark bg-dark border-bottom-gold"
    >
      <div class="container-fluid">
        <a class="navbar-brand gold" href="#"
          ><img src="./src/logo.png" alt="" width="150" draggable="false"
        /></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mynavbar">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a
                class="nav-link gold"
                id="home"
                onclick="homepage()"
                
                >Home</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link gold"
                id="popular"
                onclick="topAiring()"
                >Top-airing</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link gold"
                id="recent"
                onclick="recentpage()"
                >Recent</a
              >
            </li>
          </ul>
          <form class="d-flex">
            <input
              class="form-control me-2 no-outline text-dark"
              type="text"
              placeholder="Search"
              id="search"
            />
            <button
              class="btn btn-dark gold"
              type="button"
              onclick="searchpage()"
              id="search-btn"
            >
              <i class="fa fa-solid fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>`;
}
