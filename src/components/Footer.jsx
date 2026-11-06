import { site } from "../data/site";
import Sprig from "./Sprig";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="ft">
      <Sprig />
      <div className="ft-grid">
        <div>
          <h3>{site.name}</h3>
          <p>{site.address}</p>
        </div>
        <div>
          <h3>Hours</h3>
          <dl>
            {site.hours.map(([d, h]) => (
              <div key={d}>
                <dt>{d}</dt>
                <dd>{h}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h3>Contact</h3>
          <p>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </div>
      <p className="ft-fine">
        © {new Date().getFullYear()} {site.name}. <a href="#top">Back to top</a>
      </p>
    </footer>
  );
}
