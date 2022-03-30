import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Service() {
    const { id } = useParams();
    const [service, setService] = useState({});
    console.log("incoming id from params is:", id);

    useEffect(() => {
        // console.log("incoming id inside useEffect is:", id);
        fetch("/api/services/" + id)
            .then((res) => res.json())
            .then((data) => setService(data));
        // console.log("set user is", setUser);
    }, [id]);

    return (
        <section className="service-container">
            <div className="service-left">
                <img
                    src={service.profile_picture_url}
                    className="service-picture"
                />
                <h1>
                    {service.first_name} {service.last_name}
                </h1>
                <button className="service-contact-btn">Contact</button>
            </div>
            <div className="service-right">
                <p>
                    <strong className="service">Title: </strong>
                    {service.title}
                </p>
                <p>
                    <strong className="service">Category: </strong>
                    {service.category}
                </p>
                <p>
                    <strong className="service">From: </strong>
                    {service.location}
                </p>
                <p>
                    <strong className="service">
                        About {service.first_name} :{" "}
                    </strong>
                    {service.description}
                </p>
            </div>
        </section>
    );
}

export default Service;
