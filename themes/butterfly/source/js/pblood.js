function switchDarkMode() {
    "light" == ("dark" === document.documentElement.getAttribute("data-theme") ? "dark" : "light") ? (activateDarkMode(),
        saveToLocal.set("theme", "dark", 2),
        void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)) : (activateLightMode(),
        saveToLocal.set("theme", "light", 2),
        void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)),
    "function" == typeof utterancesTheme && utterancesTheme(),
        "object" === ("undefined" == typeof FB ? "undefined" : _typeof(FB)) && window.loadFBComment(),
        window.DISQUS && document.getElementById("disqus_thread").children.length && setTimeout(function() {
            return window.disqusReset()
        }, 200)
}

function catalogActive (type) {
    let xscroll = document.getElementById('catalog-list')
    if (xscroll) {
        // 鼠标滚轮滚动
        xscroll.addEventListener('mousewheel', function (e) {
        //计算鼠标滚轮滚动的距离
        xscroll.scrollLeft -= e.wheelDelta / 2
        //阻止浏览器默认方法
        e.preventDefault()
        }, false)
    
        // 高亮当前页面对应的分类或标签
        let path = window.location.pathname
        path = decodeURIComponent(path)
        let pattern = type == 'tags' ? /\/tags\/.*?\// : /\/categories\/.*?\//
        if (pattern.test(path)) {
        document.getElementById(type + '-' + path.split('/')[2]).classList.add('selected')
        }
    }
    }
    catalogActive('categories')
    catalogActive('tags')