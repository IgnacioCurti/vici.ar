import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { authService } from "../../../services/auth.service";
import { Spinner } from "@heroui/react";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("Verificando tu email...");
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;

    const verifyEmail = async () => {
      const code = searchParams.get("code");
      const userIdParam = searchParams.get('userId');

      if (!code || !userIdParam) {
        setStatus("error");
        setMessage("Link de verificacion invalido");
        return;
      }

      const userId = Number(userIdParam);
      if (isNaN(userId)) {
        setStatus("error");
        setMessage("Id de usuario invalido");
        return;
      }

      try {
        hasVerified.current = true;

        await authService.verifyEmail(userId, code);
        setStatus("success");
        setMessage("Email verificado exitosamente");
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        setStatus("error");

        let errorMessage = "Error al verificar el email. El código puede ser inválido o haber expirado.";

        if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data?.message || errorMessage;
        }
        setMessage(errorMessage);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-[--color-background]">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
        {status === 'verifying' && (
          <>
            <Spinner size="lg" color="primary" />
            <p className="mt-4 text-lg text-gray-700">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Verificado!</h2>
            <p className="text-gray-600">{message}</p>
            <p className="text-sm text-gray-500 mt-4">Redirigiendo...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-red-500 text-6xl mb-4">✕</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
            <p className="text-gray-600">{message}</p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 px-6 py-2 bg-[--color-primary-light] text-white rounded-lg hover:opacity-90"
            >
              Volver al inicio
            </button>
          </>
        )}
      </div>
    </div>
    </>
  )
};

export default VerifyEmail;
