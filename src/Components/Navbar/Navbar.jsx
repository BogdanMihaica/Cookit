import "./Navbar.css";

export const Navbar = () => {
  return (
    <div id="menuDemo">
      <div id="cssmenu">
        <ul>
          <li>
            <span>
              Creative <i class="arrow"></i>
            </span>
            <ul class="dropdown">
              <li>
                <a href="/">Curabitur</a>
              </li>
              <li>
                <span>
                  Suspendisse vel <i class="arrow"></i>
                </span>
                <ul class="dropdown">
                  <li>
                    <a href="/">Etiam vestibulum</a>
                  </li>
                  <li>
                    <a href="/">Integer efficitur</a>
                  </li>
                  <li>
                    <a href="/">Finibus nibh</a>
                  </li>
                </ul>
              </li>
              <li>
                <ul class="dropdown">
                  <li>
                    <a href="/">Nam elementum</a>
                  </li>
                  <li>
                    <a href="/">Magna pharetra</a>
                  </li>
                  <li>
                    <a href="/">Pulvinar mi eget</a>
                  </li>
                  <li>
                    <a href="/">Tincidunt orci</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a href="/">Studio</a>
          </li>
          <li class="full-width">
            <span>
              Press <i class="arrow"></i>
            </span>
            <div class="dropdown">
              <div class="clm">
                <h3>Integer</h3>
                <a href="/">Lacus iaculis</a>
                <a href="/">Eu tortor</a>
                <a href="/">Luctus varius</a>
              </div>
              <div class="clm">
                <h3>Efficitur Viverra</h3>
                <a href="/">Praesent</a>
                <h3>At Eros</h3>
                <a href="/">Pellentesque </a>
                <a href="/">Dignissim pulvinar</a>
              </div>
            </div>
          </li>
          <li>
            <a href="/">Blog</a>
          </li>
          <li>
            <span>
              Contact <i class="arrow"></i>
            </span>
            <ul class="dropdown right0">
              <li>
                <a href="/">Nam elementum</a>
              </li>
              <li>
                <a href="/">Magna pharetra</a>
              </li>
              <li>
                <a href="/">Pulvinar mi eget</a>
              </li>
              <li>
                <a href="/">Tincidunt orci</a>
              </li>
              <li>
                <ul class="dropdown right0">
                  <li>
                    <a href="/">Nam elementum</a>
                  </li>
                  <li>
                    <a href="/">Magna pharetra</a>
                  </li>
                  <li>
                    <a href="/">Pulvinar mi eget</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
