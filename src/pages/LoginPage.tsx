import { LoginFormCard } from '../components/LoginPage/LoginFormCard';
import loginBackground from '../assets/images/backgrounds/login_bg.png';

export function LoginPage() {
  return (
    <div
      className="w-full min-h-screen flex justify-center bg-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${loginBackground})`,
      }}
    >
      <div className=" pt-11 w-full flex justify-center">
        <LoginFormCard />
      </div>
    </div>
  );
}
