// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item "><a href="index.html"><strong aria-hidden="true">1.</strong> 首页</a></li><li class="chapter-item "><a href="2001 英语一真题.html"><strong aria-hidden="true">2.</strong> 2001 英语一真题</a></li><li class="chapter-item "><a href="2002 英语一真题.html"><strong aria-hidden="true">3.</strong> 2002 英语一真题</a></li><li class="chapter-item "><a href="2003 英语一真题.html"><strong aria-hidden="true">4.</strong> 2003 英语一真题</a></li><li class="chapter-item "><a href="2004 英语一真题.html"><strong aria-hidden="true">5.</strong> 2004 英语一真题</a></li><li class="chapter-item "><a href="2005 英语一真题.html"><strong aria-hidden="true">6.</strong> 2005 英语一真题</a></li><li class="chapter-item "><a href="2006 英语一真题.html"><strong aria-hidden="true">7.</strong> 2006 英语一真题</a></li><li class="chapter-item "><a href="2007 英语一真题.html"><strong aria-hidden="true">8.</strong> 2007 英语一真题</a></li><li class="chapter-item "><a href="2008 英语一真题.html"><strong aria-hidden="true">9.</strong> 2008 英语一真题</a></li><li class="chapter-item "><a href="2009 英语一真题.html"><strong aria-hidden="true">10.</strong> 2009 英语一真题</a></li><li class="chapter-item "><a href="2010 英语一真题.html"><strong aria-hidden="true">11.</strong> 2010 英语一真题</a></li><li class="chapter-item "><a href="2011 英语一真题.html"><strong aria-hidden="true">12.</strong> 2011 英语一真题</a></li><li class="chapter-item "><a href="2012 英语一真题.html"><strong aria-hidden="true">13.</strong> 2012 英语一真题</a></li><li class="chapter-item "><a href="2013 英语一真题.html"><strong aria-hidden="true">14.</strong> 2013 英语一真题</a></li><li class="chapter-item "><a href="2014 英语一真题.html"><strong aria-hidden="true">15.</strong> 2014 英语一真题</a></li><li class="chapter-item "><a href="2015 英语一真题.html"><strong aria-hidden="true">16.</strong> 2015 英语一真题</a></li><li class="chapter-item "><a href="2016 英语一真题.html"><strong aria-hidden="true">17.</strong> 2016 英语一真题</a></li><li class="chapter-item "><a href="2017 英语一真题.html"><strong aria-hidden="true">18.</strong> 2017 英语一真题</a></li><li class="chapter-item "><a href="2018 英语一真题.html"><strong aria-hidden="true">19.</strong> 2018 英语一真题</a></li><li class="chapter-item "><a href="2019 英语一真题.html"><strong aria-hidden="true">20.</strong> 2019 英语一真题</a></li><li class="chapter-item "><a href="2020 英语一真题.html"><strong aria-hidden="true">21.</strong> 2020 英语一真题</a></li><li class="chapter-item "><a href="2021 英语一真题.html"><strong aria-hidden="true">22.</strong> 2021 英语一真题</a></li><li class="chapter-item "><a href="2022 英语一真题.html"><strong aria-hidden="true">23.</strong> 2022 英语一真题</a></li><li class="chapter-item "><a href="2023 英语一真题.html"><strong aria-hidden="true">24.</strong> 2023 英语一真题</a></li><li class="chapter-item "><a href="2024 英语一真题.html"><strong aria-hidden="true">25.</strong> 2024 英语一真题</a></li><li class="chapter-item "><a href="2025 英语一真题.html"><strong aria-hidden="true">26.</strong> 2025 英语一真题</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
