function Footer() {
    return (
        <section className="footer-container">
            <div className="footer-left">
                <a href="mailto:rezahajipour@gmail.com" className="mailTo">
                    Contact
                </a>

                <p>
                    Copyright &copy;{" "}
                    <a href="https://www.rezahajipour.com" className="mailTo">
                        REZA HAJIPOUR
                    </a>{" "}
                    {new Date().getFullYear()}
                </p>
            </div>
            <div className="footer-right">
                <p> Photos by Levi Stute, Albert Dera, Piero Nigro,</p>
                <p>Laura Chouette, Jakob Rosen on Unsplash</p>
            </div>
        </section>
    );
}

export default Footer;
