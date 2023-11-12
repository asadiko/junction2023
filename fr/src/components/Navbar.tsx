export const Navbar = () => {
  return (
    <nav className="w-full flex flex-col">
      <div className="flex">
        <h1 className="text-4xl">
          creo
          <sub className="text-sm">version 0.1</sub>
        </h1>
      </div>
      <p>
        ask <span>build</span> deploy
      </p>
    </nav>
  );
};
