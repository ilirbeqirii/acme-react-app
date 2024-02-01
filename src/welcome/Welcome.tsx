import acmeLogo from "../assets/logo.jpg";
import "./Welcome.css";

function Welcome() {
  const pageTitle = "Welcome!";

  return (
    <div className="card">
      <div className="card-header">{pageTitle}</div>
      <div className="card-body">
        <div className="row">
          <div className="mx-auto w-auto">
            <img
              src={acmeLogo}
              alt="Acme logo"
              className="img-responsive"
              style={{ maxHeight: "300px", paddingBottom: "50px" }}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="text-center col-md-12">Developed by:</div>
          <div className="col-4" style={{ width: "200px" }}>
            <h3 className="text-center">Deborah Kurata</h3>

            <div className="text-center">&#64;deborahkurata</div>
            <div className="text-center">
              <a href="http://www.bit.ly/DeborahKsBlog">
                www.bit.ly/DeborahKsBlog
              </a>
            </div>
          </div>
          <div className="col-4" style={{ width: "200px" }}>
            <h3 className="text-center">Duncan Hunter</h3>

            <div className="text-center">&#64;dunchunter</div>
            <div className="text-center">
              <a href="https://duncanhunter.com.au">duncanhunter.com.au</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
