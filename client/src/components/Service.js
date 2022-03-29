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
        <section className="profile-container">
            <h1> Service</h1>
            <img src={service.profile_picture_url} className="profile-img" />
            <h1>
                {service.first_name} {service.last_name}
            </h1>
            <p>{service.title}</p>
            <p>{service.category}</p>
            <p>{service.description}</p>
            <p>{service.location}</p>
        </section>
    );
}

export default Service;
