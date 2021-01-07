const dampMultiple = 0.8;

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

    pullTowards(parent) {
        const xDiff = this.x - parent.x;
        const yDiff = this.y - parent.y;
        const dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
        const desiredDist = 20;
        const push = desiredDist - dist;

        this.dx += 0.01 * push * (xDiff / dist);
        this.dy += 0.01 * push * (yDiff / dist);
    }

    pushAway(other) {
        const xDiff = this.x - other.x;
        const yDiff = this.y - other.y;
        const dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

        this.dx += (1 / dist) * (xDiff / dist);
        this.dy += (1 / dist) * (yDiff / dist);
    }

    update() {
        for (const child of this.children) {
            child.pullTowards(this);
        }

        if (this.elem.checked) {
            this.dx = 0;
            this.dy = 0;
            return;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.dx *= dampMultiple;
        this.dy *= dampMultiple;

        this.elem.style.left = this.x + 'px';
        this.elem.style.top = this.y + 'px';
    }

    makeChild() {
        const child = new Checkbox({
            x: this.x + Math.random() - 0.5,
            y: this.y + Math.random() - 0.5,
        });
        return child;
    }


}