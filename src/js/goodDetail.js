// 轮播图和放大镜
class Zoom {
    constructor() {
        // 获取所有小图
        this.small_pics = document.getElementsByClassName('small_pic');
        // 获取所有主图
        this.big_pics = document.getElementsByClassName('big_pic');
        // 获取所有放大图（所在的全部li）
        this.show_pics = document.getElementsByClassName('show_pic');
        // 获取放大图盒子
        // this.show_pic_lis = document.querySelectorAll('.show_pic');
        // 获取放大图img
        this.show_imgs = document.querySelectorAll('.show_pic img')
        // 获取主图数量
        this.big_nums = this.big_pics.length;
        // 获取小图数量
        this.small_nums = this.small_pics.length;
        // 获取放大图数量
        this.show_nums = this.show_pics.length;
        // 设置当前下标
        this.cur_index = 0;
        //滑块
        this.float = document.querySelector('.float_layer');
        //遮罩
        this.mark = document.querySelector('.mark');
        // 添加事件
        this.addEvent();
    }
    // 点击实现轮播效果
    slide() {
        for (let i = 0; i < this.big_nums; i++) {
            this.big_pics[i].style.display = 'none';
        }
        this.big_pics[this.cur_index].style.display = 'block';
        for (let i = 0; i < this.show_nums; i++) {
            this.show_pics[i].style.display = 'none';
        }
        this.show_pics[this.cur_index].style.display = 'none';
    }
    // 添加事件
    addEvent() {
        for (let i = 0; i < this.small_nums; i++) {
            this.small_pics[i].onmouseenter = () => {
                this.cur_index = i;
                this.slide();
            }
        }
        // 遮罩 - 移入
        // 滑块显示
        // 大图盒子显示
        this.mark.onmouseenter = function () {
            this.float.style.display = 'block';
            this.show_pics[this.cur_index].style.display = 'block';
        }.bind(this);
        // 遮罩 - 移出
        // 滑块消失
        // 大图盒子消失
        this.mark.onmouseleave = function () {
            this.float.style.display = 'none';
            this.show_pics[this.cur_index].style.display = 'none';
        }.bind(this);
        // 遮罩 - 移动 - 鼠标跟随效果
        this.mark.onmousemove = function (evt) {
            let e = evt || window.event;

            let left = e.offsetX - this.float.offsetWidth / 2;
            let top = e.offsetY - this.float.offsetHeight / 2;
            //边界
            if (left <= 0) {
                left = 0;
            } else if (left >= this.mark.offsetWidth - this.float.offsetWidth) {
                left = this.mark.offsetWidth - this.float.offsetWidth;
            }
            if (top <= 0) {
                top = 0;
            } else if (top >= this.mark.offsetHeight - this.float.offsetHeight) {
                top = this.mark.offsetHeight - this.float.offsetHeight
            }
            this.float.style.left = left + 'px';
            this.float.style.top = top + 'px';

            // //核心
            // let p_x = left / (遮罩的宽度 - 滑块的宽度);
            // let p_y = top / (遮罩的高度 - 滑块的高度);
            let p_x = left / (this.mark.offsetWidth - this.float.offsetWidth);
            let p_y = top / (this.mark.offsetHeight - this.float.offsetHeight);

            // //设置大图的位置
            // 大图.style.left = -（大图的宽度 - 大图盒子的宽度）* p_x + 'px';
            // 大图.style.top = -（大图的高度 - 大图盒子的高度）* p_y + 'px';
            this.show_imgs[this.cur_index].style.left = -(this.show_imgs[this.cur_index].offsetWidth - this.show_pics[this.cur_index].offsetWidth) * p_x + 'px';
            this.show_imgs[this.cur_index].style.top = - (this.show_imgs[this.cur_index].offsetHeight - this.show_pics[this.cur_index].offsetHeight) * p_y + 'px';
        }.bind(this);
    }
}
new Zoom();

// 商品尺寸选择
class Sizes {
    constructor() {
        this.size_num = document.querySelector('.size_num');
        this.selects = document.querySelectorAll('.select');
        // console.log(this.selects);
        this.selects_num = this.selects.length;
        // console.log(this.selects_num);
        this.selections = document.querySelectorAll('.selection');
        // console.log(this.selections);
        this.addEvent();
        this.cur_index = 0;
        // var that = this;
    }
    addEvent() {

    }
}
new Sizes();

// 加购数量设置
class Nums {
    constructor() {
        // 获取上箭头
        this.up_arrow = document.querySelector('.add');
        // 获取下箭头
        this.down_arrow = document.querySelector('.reduce');
        // 获取数字输入框
        this.inp = document.getElementById('input_num');
        // 设置初始数量
        this.num_content = 1;
        // 添加事件
        this.addEvent();
    }
    addEvent() {
        // 点击上箭头增加
        this.up_arrow.onclick = () => {
            this.num_content = this.inp.value;
            let j = ++this.num_content;
            this.inp.value = j;
        }
        // 点击下箭头减少
        this.down_arrow.onclick = () => {
            this.num_content = this.inp.value;
            let j = this.num_content;
            if (j > 1) {
                j--;
                this.inp.value = j;
            } else {
                this.inp.value = 1;
            }
        }

        this.inp.onblur = () => {
            // let input_value = this.inp.value;
            let re = /^[1-9]+[0-9]$/;
            // console.log(re.test(input_value))
            if (re.test(this.inp.value)) {
                this.inp.style.border = '1px solid #666';
                // this.inp.value = this.inp.value;
            } else {
                this.inp.value = 1;
                alert('请输入纯数字');
            }
        }
    }
}
new Nums();

// 购物车
class Product {
    constructor() {
        //登录信息
        this.header = document.querySelector('#header');
        //购买按钮
        this.buys = document.querySelectorAll('#immediate_buy');
        //购物车按钮
        this.cart_btn = document.querySelector('#addCart');
        //设置登录信息
        // this.init(); //初始化
        this.selects = document.querySelectorAll('.select');
        //添加尺码选择事件
        this.addEvent();
        // 添加购物袋事件
        this.addShop();
    }
    addShop() {
        this.cart_btn.onclick = function () {
            // 商品ID
            var good_id = document.querySelector('.goodDetail').id;
            // console.log(good_id);
            // 内容
            var good_name = document.querySelector('.goodTitle').innerText;
            // 价格
            var good_price = document.querySelector('.price_cur').innerText;
            // 颜色
            var good_color = document.querySelector('.select1').title;
            // 尺码
            var good_size = document.querySelector('.selected').innerText;
            // 缩略图路径
            var good_img = document.querySelector('.thum_img').src;
            // 数量
            var good_num = document.querySelector('.cart_num').value;
            // console.log(good_img);
            var key = "yougou" + good_id;
            var value = {

                "name": good_name,
                "src": good_img,
                "color": good_color,
                "size": good_size,
                "price": good_price,
                "num": good_num

            }
            window.localStorage.setItem(key, JSON.stringify(value));
        }
    }

    addEvent() {
        // 商品尺码选择
        //记录this
        let that = this;
        this.cart_btn.onclick = function () {
            location.href = '';//这里添加购物车页面链接
        }
        var size = 34;
        for (let i = 0; i < this.selects.length; i++) {
            this.selects[i].onclick = function () {
                size = this.innerText;
                that.selected = document.getElementsByClassName('selected')[0];
                if (that.selected) {
                    that.selected.classList.remove('selected');
                    this.classList.add('selected');
                } else {
                    this.classList.add('selected');
                }
                // alert(size);
            }
        }
    }
}
new Product();