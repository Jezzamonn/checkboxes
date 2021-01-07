const dampMultiple = 0.9;

export class Checkbox {

    constructor({x, y, dx=0, dy=0}) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.children = [];

        this.elem = document.createElement("input");
        this.elem.type = "checkbox";
        this.elem.classList.add('checkbox');
        this.elem.style.top = this.y + 'px';
        this.elem.style.left = this.x + 'px';

        this.onChecked = () => {};
        this.onUnChecked = () => {};

        this.elem.onchange = () => {
            if (this.elem.checked) {
                this.onChecked(this);
            }
            else {
                this.onUnChecked(this);
            }
        }
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        this.dx *= dampMultiple;
        this.dy *= dampMultiple;

        this.elem.style.left = this.x + 'px';
        this.elem.style.top = this.y + 'px';
    }

    makeChild() {
        const angle = 2 * Math.PI * Math.random();
        const speed = 2 + Math.random();
        const child = new Checkbox({
            x: this.x,
            y: this.y,
            dx: speed * Math.cos(angle),
            dy: speed * Math.sin(angle),
        });
        return child;
    }


}