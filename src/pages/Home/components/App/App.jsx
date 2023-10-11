const App = ({
  pageApps,
  openApps,
  setOpenApps,
  appPositions,
  setAppPositions,
  isSmallScreen,
}) => {
  return (
    <div className="home-screen-container">
      <div className="home-screen-content">
        {pageApps.map((app, index) => {
          return (
            <div
              key={index}
              className={`app-icon-container ${
                app.widget ? "widget-container" : ""
              }`}
              style={app.width ? { gridColumn: `span ${app.width}` } : {}}
            >
              {app.widget ? (
                <div className="widget-content">{app.widget}</div>
              ) : (
                <span
                  href="#"
                  className="app-link"
                  onClick={() => {
                    if (
                      app.component &&
                      !openApps.includes(app) &&
                      openApps.length < 7
                    ) {
                      const newIndex = openApps.length;

                      let offsetX = 0;
                      let offsetY = 0;
                      if (appPositions[newIndex - 1]) {
                        offsetX = appPositions[newIndex - 1].x + 30;
                        offsetY = appPositions[newIndex - 1].y + 30;
                      }

                      setAppPositions((prev) => ({
                        ...prev,
                        [newIndex]: { x: offsetX, y: offsetY },
                      }));

                      if (isSmallScreen) {
                        setOpenApps([app]);
                      } else {
                        setOpenApps([...openApps, app]);
                      }
                    }
                  }}
                >
                  {app.icon ? (
                    app.icon
                  ) : (
                    <img src={app.iconHref} alt={app.name} draggable={false} />
                  )}
                  <span className="app-label">{app.label}</span>
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;