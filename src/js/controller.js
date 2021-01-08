import { Checkbox } from "./checkbox";

export default class Controller {

    constructor() {
        this.container = document.querySelector('#content');

        this.checkboxes = [];
        this.addCheckbox(new Checkbox({x: 0, y: 0}));

    }

    /**
     * Simulate time passing.
     */
    update() {
        for (const checkbox of this.checkboxes) {
            checkbox.update();

            if (!checkbox.elem.checked) {
                for (const other of this.checkboxes) {
                    if (other === checkbox) {
                        continue;
                    }
                    checkbox.pushAway(other);
                }
            }
        }
    }

    addCheckbox(checkbox) {
        this.container.append(checkbox.elem);

        checkbox.onChecked = (checkbox) => {
            const numChildren = Math.floor(2 + 2 * Math.random())
            for (let i = 0; i < numChildren; i++) {
                const child = checkbox.makeChild();
                checkbox.children.push(child);
                this.addCheckbox(child);
            }
        }

        checkbox.onUnChecked = (checkbox) => {
            for (const child of checkbox.children) {
                this.removeCheckbox(child);
            }
            checkbox.children = [];
        }

        this.checkboxes.push(checkbox);
    }

    removeCheckbox(checkbox) {
        // Remove all its children (and their children, etc)
        for (const child of checkbox.children) {
            this.removeCheckbox(child);
        }

        this.container.removeChild(checkbox.elem);
        this.checkboxes.splice(this.checkboxes.indexOf(checkbox), 1);
    }

}
