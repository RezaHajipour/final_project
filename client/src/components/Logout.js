function Logout() {
    async function onSubmit(e) {
        e.preventDefault();

        await fetch("/api/logout", { method: "POST" });
        window.location.href = "/";
    }
    return (
        <form onSubmit={onSubmit} className="logout">
            <button>LOGOUT</button>
        </form>
    );
}

export default Logout;
