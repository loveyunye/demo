function Circle(parent, parentMargin = 0, childMargin = 0) {
  this.parent = parent;
  this.childrenList = Array.prototype.slice.apply(this.parent.children);
  this.parentMargin = parentMargin; // 外圆内边距
  this.childMargin = childMargin; // 各圆相距
  // 外圆半径
  this.parentRadius = this.parent.offsetWidth / 2 ;
  this.collection = [];
}
Circle.prototype = {
  randomCircle() {
    this.childrenList.forEach((element) => {
      const radius = element.offsetWidth / 2;
      const { x, y } = this.getXY(radius);
      element.style.transform = `translate(${x}px, ${y}px)`;
      // 加入集合
      this.collection.push({
        x,
        y,
        radius:(element.offsetWidth / 2),
      });
    });
  },
  // 获取xy
  getXY(radius) {
    const x = Math.floor((1 - Math.random()) * this.parentRadius * 2 );
    const y = Math.floor((1 - Math.random()) * this.parentRadius * 2 );
    if (this.hasCrossing({x, y, radius})) {
      return {x, y};
    } else {
      return this.getXY(radius);
    }
  },
  // 是否越界
  hasCrossing({x, y, radius}) {
    // 判断是否超出parent圆
    const distance = Math.sqrt(Math.pow((x - this.parentRadius), 2) + Math.pow((y - this.parentRadius), 2));
    const cross = distance + radius < this.parentRadius;
    // 判断是否和其他圆碰撞
    const collision = this.collection.every((item) => {
      return item.radius + radius < Math.sqrt(Math.pow((x - item.x), 2) + Math.pow((y - item.y), 2));
    })
    return cross && collision;
  },
  init() {
    this.randomCircle();
  }
}

const outer = document.querySelector('.outer');
const outerCircle = new Circle(outer);
outerCircle.init();

const first = document.querySelector('.first');
const firstCircle = new Circle(first);
firstCircle.init();

const second = document.querySelector('.second');
const secondCircle = new Circle(second);
secondCircle.init();

const three = document.querySelector('.three');
const threeCircle = new Circle(three);
threeCircle.init();