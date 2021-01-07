import { Checkbox } from "./checkbox";

export default class Controller {

    constructor() {
        this.container = document.querySelector('#content');

        this.checkboxes = [];
        this.addCheckbox(new Checkbox({x: window.innerWidth / 2, y: window.innerHeight / 2}));

    }

    /**
     * Simulate time passing.
     */
    update() {
        for (const checkbox of this.checkboxes) {
            checkbox.update();
        }
    }

    addCheckbox(checkbox) {
        this.container.prepend(checkbox.elem);

        checkbox.onChecked = (checkbox) => {
            const child = checkbox.makeChild();
            checkbox.children.push(child);
            this.addCheckbox(child);
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
        this.checkboxes.splice(this.checkboxes.indexOf(checkbox));
    }

}
