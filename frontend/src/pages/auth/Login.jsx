import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await login(email, password);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Inicio de sesión exitoso");

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ??
                "Correo o contraseña incorrectos"
            );
        }
    };

    return (
        <div className="login-card">

            <h2>Iniciar sesión</h2>

            <p className="subtitle">
                Ingresa para continuar comprando
            </p>

            <form onSubmit={handleSubmit}>

                <div className="input-group">

                    <Mail />

                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                </div>

                <div className="input-group">

                    <Lock />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                </div>

                <div className="options">

                    <label>

                        <input type="checkbox" />

                        Recordarme

                    </label>

                    <a href="#">
                        ¿Olvidaste tu contraseña?
                    </a>

                </div>

                <button type="submit">
                    Entrar
                </button>

                <p className="register">

                    ¿No tienes cuenta?

                    <a href="#">
                        Crear cuenta
                    </a>

                </p>

            </form>

        </div>
    );
}