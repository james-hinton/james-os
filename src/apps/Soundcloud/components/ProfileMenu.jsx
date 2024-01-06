const ProfileMenu = () => {
  const menuItems = [
    "All",
    "Popular tracks",
    "Tracks",
    "Albums",
    "Playlists",
    "Reposts",
  ];

  return (
    <>
      <div className="sc-flex sc-border-b-[1.1px] sc-m-1 sc-border-b-black-300">
        {menuItems.map((item, index) => (
          <div
            key={"profile-" + index}
            className="sc-cursor-pointer sc-flex sc-items-center sc-px-5 sc-py-3 "
          >
            <p
              className={"sc-text-gray-800 sc-font-semibold sc-hover:font-bold" + (index === 0 ? " sc-profile-menu-item-active" : "")}
              onClick={(e) => {
                document
                  .querySelectorAll(".sc-profile-menu-item-active")
                  .forEach((el) => {
                    el.classList.remove("sc-profile-menu-item-active");
                  });
                e.target.classList.add("sc-profile-menu-item-active");
              }}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfileMenu;
