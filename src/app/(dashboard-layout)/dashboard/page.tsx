const DashboardPage = () => {
  return (
    <section className="max-w-[1280px] mx-auto">
      <div className="dashboard-container  gap-5">
        {/* Left side bar */}
        <div className="dashboard-card-bg  ">
          <div className="flex flex-col justify-between h-screen  p-2 text-sm">
            <div>
              <h1>Kobir</h1>
            </div>
            <div>
              <ul className="flex flex-col gap-4">
                <li>HOME</li>
                <li>INSTAGRAM</li>
                <li>FACEBOOK</li>
                <li>TWITTER</li>
                <li>LINKEDIN</li>
              </ul>
            </div>
            <div>
              <h1>Logout</h1>
            </div>
          </div>
        </div>
        {/* Middle bar */}

        <div className="dashboard-card-bg">Middle</div>
        {/* Right bar */}
        <div className="dashboard-card-bg">Right</div>
      </div>
    </section>
  );
};

export default DashboardPage;
