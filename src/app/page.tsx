import ClosetProvider from "../providers/ClosetProvider";
import Avatar from "./_components/Avatar";
import Closet from "./_components/Closet";
import SexType from "./_components/SexType";

export default function Home() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h6 className="text-secondary underline">ขั้นตอนที่ 1</h6>
            <h3 className="text-lg text-secondary">
              มาเริ่มสร้างตัวละครของเธอกัน !
            </h3>
          </div>
          <button className="border-2 bg-secondary text-background border-secondary w-fit h-fit px-3 py-1 rounded">
            ต่อไป
          </button>
        </div>
      </div>
      <ClosetProvider>
        <div className="flex flex-col flex-1 items-center mt-10 gap-6">
          <Avatar className="w-1/2 aspect-square border-4 border-secondary" />
          <SexType />
          <Closet />
        </div>
      </ClosetProvider>
    </div>
  );
}
