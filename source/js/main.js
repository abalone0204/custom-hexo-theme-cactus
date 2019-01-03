/**
 * Sets up Justified Gallery.
 */
function getScrollTop() {
  var supportPageOffset = window.pageXOffset !== undefined;
  var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
  var scrollTop = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
  return scrollTop
}

function isVisible(element) {
  const style = getComputedStyle(element)
  return style.visibility !== 'hidden' && style.opacity !== 0
}

function toggleDisplay(element) {
  const style = element.style.display ? element.style : getComputedStyle(element)
  if (style.display === 'none') {
    element.style.display = 'block'
  } else {
    element.style.display = 'none'
  }
}

document.addEventListener("DOMContentLoaded", function(){
  /**
   * Shows the responsive navigation menu on mobile.
   */
  const $menuIcon = document.querySelector('#header > #nav > ul > .icon');
  $menuIcon.addEventListener('click', (e) => {
    e.target.classList.toggle('responsive')
  });

  /**
   * Controls the different versions of  the menu in blog post articles 
   * for Desktop, tablet and mobile.
   */
  var $post = document.querySelector('.post')
  if ($post) {
    var menu = document.getElementById("menu");
    var nav = document.querySelector("#menu > #nav");
    var menuIcon = document.getElementById("menu-icon");
    var menuIconTablet = document.getElementById("menu-icon-tablet");
    var footer = document.getElementById("footer-post");
    var documentWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    /**
     * Display the menu on hi-res laptops and desktops.
     */
    if (documentWidth >= 1440) {
      menu.style.visibility = "visible";
      menuIcon.classList.add("active");
      menuIconTablet.classList.add("active");
    }
    /**
     * Display the menu if the menu icon is clicked.
     */
    function bindMenuDisplayHandler(element) {
      element.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (getComputedStyle(menu).visibility === 'hidden') {
          menu.style.visibility = "visible";
          element.classList.add("active");
        } else {
          menu.style.visibility = "hidden";
          element.classList.remove("active");
        }
      })
    }
    bindMenuDisplayHandler(menuIcon)
    bindMenuDisplayHandler(menuIconTablet)

    /**
      * Add a scroll listener to the menu to hide/show the navigation links.
      */
     if (menu) {
      window.addEventListener('scroll', function(e) {
        var topDistance = menu.offsetTop;
        // hide only the navigation links on desktop
        if (!isVisible(nav) && topDistance < 50) {
          nav.style.display = 'block';
        } else if (isVisible(nav) && topDistance > 100) {
          nav.style.display = 'none';
        }
        // on tablet, hide the navigation icon as well and show a "scroll to top
        // icon" instead
        var menuIcon = document.getElementById('menu-icon')
        var isMenuIconVisible = isVisible(menuIcon)
        if (!isMenuIconVisible && topDistance < 50 ) {
          document.getElementById("menu-icon-tablet").style.display = 'block';
          document.getElementById("top-icon-tablet").style.display = 'none';
        } else if (!isMenuIconVisible && topDistance > 100) {
          document.getElementById("menu-icon-tablet").style.display = 'none';
          document.getElementById("top-icon-tablet").style.display = 'block';
        }
      });
     }
         /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    if (footer) {
      var lastScrollTop = 0;
      var footerActions = document.getElementById('actions-footer');
      window.addEventListener('scroll', function(e) {
        var topDistance = getScrollTop()
        var footerPost = document.getElementById('footer-post')
        if (topDistance > lastScrollTop){
          // downscroll -> show menu
          footerPost.style.display = 'none';
        } else {
          // upscroll -> hide menu
          footerPost.style.display = 'block';
        }
        lastScrollTop = topDistance;
        // close all submenu"s on scroll
        document.getElementById('nav-footer').style.display = 'none';
        document.getElementById('toc-footer').style.display = 'none';
        document.getElementById('share-footer').style.display = 'none';

        // show a "navigation" icon when close to the top of the page, 
        // otherwise show a "scroll to the top" icon
        const backToTop = document.getElementById('top')
        if (topDistance < 50) {
          backToTop.style.display = 'none';
        } else if (topDistance > 100) {
          backToTop.style.display = 'block';
        }
      })
      footerActions.addEventListener('click', function(event) {
        var matched = false
        if (event.target.matches('#menu')) {
          matched = true;
          toggleDisplay(document.getElementById('nav-footer'))
        }
        if (event.target.matches('#toc')) {
          matched = true;
          toggleDisplay(document.getElementById('toc-footer'))
        }
        if (event.target.matches('#share')) {
          matched = true;
          toggleDisplay(document.getElementById('share-footer'))
        }
        if (matched) {
          event.preventDefault();
          event.stopPropagation();
        }
      })
      
    }
  }
})
