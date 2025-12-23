import logoClaro from '/logo-claro.png';

export default function LogoHover() {
  return (
    <div className="select-none">
      <img
        src={logoClaro}
        alt="CLARO"
        className="h-16 md:h-20 lg:h-24 transition-transform duration-300 hover:scale-110 hover:-translate-y-1"
      />
    </div>
  );
}
