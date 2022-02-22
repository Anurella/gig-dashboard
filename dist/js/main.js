/*! SidegigDashboard v1.0.0 | (c) 2022 Amaka | MIT License | http://github.com/cferdinandi/build-tools-boilerplate */
(function () {
  'use strict';

  console.log("Does it work");
  let select = (e) => document.querySelector(e);

  select(".menu-hamburger").addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    select(".nav").classList.add("isOpen");
  });

  select(".nav").addEventListener("click", (e) => {
    e.stopPropagation();
    select(".nav").classList.remove("isOpen");
  });

})();
//# sourceMappingURL=main.js.map
