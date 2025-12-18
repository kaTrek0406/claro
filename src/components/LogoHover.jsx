export default function LogoHover() {
  return (
    <div className="select-none">
      <img
        src="/logo-claro.png"
        alt="CLARO"
        className="h-14 md:h-16 transition-transform duration-300 hover:scale-110 hover:-translate-y-1"
      />
    </div>
  );
}
