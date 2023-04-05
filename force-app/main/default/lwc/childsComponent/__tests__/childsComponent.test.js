import { createElement } from 'lwc';
import ChildsComponent from 'c/childsComponent';

describe('c-childs-component', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
    beforeEach(() => {

        const element = createElement('c-childs-component', {
            is: ChildsComponent
        });

        // Act
        document.body.appendChild(element);
    });
    it('child Object', () => {
       
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
        


    });
});