window.addEventListener('load', function() {
    var arrowl = document.querySelector('.arrow-l');
    var arrowr = document.querySelector('.arrow-r');
    var focus = document.querySelector('.bannerhny-right');
    focus.addEventListener('mouseenter', function() {
        arrowl.style.display = 'block';
        arrowr.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function() {
        arrowl.style.display = 'none';
        arrowr.style.display = 'none';
        timer = setInterval(function() {
            arrowr.click();
        }, 2000)
    })
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    var focuswidth = focus.offsetWidth;
    for (var i = 0; i < ul.children.length; i++) {
        // 创建节点
        var li = document.createElement('li');
        //给每个li设置索引号
        li.setAttribute('index', i);
        //插入节点
        ol.appendChild(li);
        //绑定点击事件
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //点击圆圈，移动图片
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * focuswidth);
        })
    }
    ol.children[0].className = 'current';
    //控制箭头播放
    var num = 0;
    //克隆第一张图片放在ul的最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //控制小圆圈变换
    var circle = 0;
    var flag = true;
    arrowr.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focuswidth, function() {
                flag = true;
            });
            circle++;
            if (circle == ol.children.length)
                circle = 0;
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }

    })
    arrowl.addEventListener('click', function() {
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * focuswidth + 'px';
        }
        num--;
        animate(ul, -num * focuswidth);
        circle--;
        if (circle < 0)
            circle = ol.children.length - 1;
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';

    })
    var timer = setInterval(function() {
        arrowr.click();
    }, 2000)

})