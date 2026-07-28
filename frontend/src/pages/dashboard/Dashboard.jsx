export default function Dashboard() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (

        <div
            style={{
                padding: "40px",
                textAlign: "center"
            }}
        >

            <h1>
                Dashboard
            </h1>

            <h2>
                Bienvenido
            </h2>

            <p>

                {user?.name}

            </p>

            <p>

                Rol:
                {" "}
                <strong>
                    {user?.role}
                </strong>

            </p>

        </div>

    );

}