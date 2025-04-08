import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GoogleUser } from "../../../shared/types/types";
import {
  handleGoogleError,
  handleGoogleSuccess,
} from "../handlers/authHandlers";

const Card = styled.div`
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: aliceblue;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Overlay = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ visible }) => (visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

interface LoginProps {
  onLoginSuccess: (user: GoogleUser) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ""}>
      <Wrapper>
        <Card>
          <FlexColumn>
            <h3>Claudia CMS</h3>
            <GoogleLogin
              onSuccess={(credentialResponse) =>
                handleGoogleSuccess(
                  credentialResponse,
                  navigate,
                  onLoginSuccess,
                  setShowModal
                )
              }
              onError={handleGoogleError}
            />
          </FlexColumn>
        </Card>
      </Wrapper>

      {/* Modal som visas om användaren inte är admin */}
      <Overlay visible={showModal}>
        <Modal>
          <FlexColumn>
            <h2>Åtkomst nekad</h2>
            <p>Du har inte admin-behörighet.</p>
            <button onClick={() => setShowModal(false)}>Stäng</button>
          </FlexColumn>
        </Modal>
      </Overlay>
    </GoogleOAuthProvider>
  );
};

export default Login;
