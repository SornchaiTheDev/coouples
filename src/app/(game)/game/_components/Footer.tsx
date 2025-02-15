import Profile from "./Profile";

function Footer() {
  return (
    <div className="w-full h-24 rounded-t-xl bg-secondary px-2 flex items-center justify-between">
      <div className="flex gap-4 items-center">
        <Profile config={{ sex: "man" }} className="w-14 h-14" />
        <h4 className="text-lg">Chokun</h4>
      </div>
      <h3 className="text-2xl">- 2 -</h3>
      <div className="flex gap-4 items-center">
        <h4 className="text-lg">Chokun</h4>
        <Profile config={{ sex: "man" }} className="w-14 h-14" />
      </div>
    </div>
  );
}

export default Footer;
