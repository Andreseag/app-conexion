export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center">
      <div className="w-11/12">
        <div className="header">
          <div className="header__container">
            {/* <div className="avatar">
              <div className="w-12 rounded-full bg-green-500 text-2xl">
                <p className="flex justify-center items-center">A</p>
              </div>
            </div> */}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
