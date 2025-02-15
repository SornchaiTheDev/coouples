import Footer from "./_components/Footer";

function GamePage() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-8 flex-1">
        <h3 className="text-secondary text-center text-lg">
          เลือกคำตอบที่เธอคิดว่า อีกคนจะตอบได้เลย
        </h3>
        <div className="grid grid-cols-12 gap-4 mt-10">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg border-2 border-secondary flex justify-center items-center text-2xl col-span-6 h-64 text-secondary"
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GamePage;
