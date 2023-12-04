export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" h-screen flex relative">
      <h1 className="absolute top-5 left-10 font-bold text-white text-xl select-none hover:cursor-pointer">
        Mahasosmed
      </h1>
      <div className="flex-1 bg-black flex justify-center items-center">
        <img src="/images/login-hero.png" alt="auth-hero" draggable={false} />
      </div>
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div className="bg-black w-72 h-72 rounded-full absolute -left-36 -top-36"></div>
        <div className="w-[40%]">{children}</div>
        <div className="bg-black w-72 h-72 rounded-full absolute -right-36 -bottom-36"></div>
      </div>
    </div>
  );
}
