import useTitle from "../hooks/useTitle.js";

function About() {
    useTitle("About");
    return (
        <section className="about-container">
            <div className="div1"></div>
            <div className="div2">
                {" "}
                <p>
                    Crew Connector is a App to connect Film and TV Crew. In this
                    App users can either register themselves as a crew, either
                    search for a crew for their project. The search can be done
                    by title, category or location.
                </p>
            </div>
            <div className="div3"></div>
            <div className="div4">
                <p>
                    From 10th January to 1st April 2022 I participated Fullstack
                    Developer Bootcamp at Spiced Academy. Thanks to their
                    teaching methods, now I am able to create a web App both in
                    Backend and Frontend. Crew Connector is my final Project and
                    made in last week of bootcamp(25th March - 1st April 2022).
                </p>
            </div>
            <div className="div5"></div>
            <div className="div6">
                <p>
                    Stacks uses for this app are as followed:
                    <br />
                    Html5, css, JavaScript, React, Node.js, Express, Postgres,
                    Jest and Figma for design.
                </p>
            </div>
        </section>
    );
}

export default About;
