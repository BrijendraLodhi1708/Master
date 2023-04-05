import { createElement } from 'lwc';
import ParentsComponent from 'c/parentsComponent';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import getAccount from '@salesforce/apex/AccountControllers.getAccounts';

async function flushPromises()
{
    return Promise.resolve();
}

jest.mock(
    "@salesforce/apex/AccountControllers.getAccounts",
    () => {
        const { createApexTestWireAdapter } = require("@salesforce/sfdx-lwc-jest");
        return {
            default: createApexTestWireAdapter(jest.fn()),
        };
    },
    { virtual: true }
);



const mockGetAccount=require('./data/mockGetAccounts.json');
const mockGetAccountType=require('./data/mockGetPicklistAccountType.json');
const mockGetAccountIndustry=require('./data/mockGetPicklistIndustry.json');
describe('c-parents-component', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
    
    beforeEach(() => {

        const element = createElement('c-parents-component', {
            is: ParentsComponent
        });

        // Act
        document.body.appendChild(element);
    });
    it('TODO: test case generated by CLI command, please fill in test logic', async() => {
        // Arrange
      
        expect(1).toBe(1);
        const element=document.body.querySelector('c-parents-component');
        const child=element.shadowRoot.querySelector('c-childs-component');
        const input = child.shadowRoot.querySelector('lightning-input');
        input.value='Acc';
        input.dispatchEvent(new CustomEvent('change',{
          detail:{value:child.value}
        }));
        //await flushPromises();
        expect(input.value).toBe('Acc');
        const combobox=element.shadowRoot.querySelectorAll('lightning-combobox');

       // expect(combobox).toBeNull();
        combobox[0].value='Prospect';

        combobox[0].dispatchEvent( new CustomEvent('change',{
            detail:{value:combobox[0].value}
        }))

        expect(combobox[0].value).toBe('Prospect');
        combobox[1].value='Agriculture';

        
        combobox[1].dispatchEvent( new CustomEvent('change',{
            detail:{value:combobox[1].value}
        }))
        expect(combobox[1].value).toBe('Agriculture');
        const button= element.shadowRoot.querySelectorAll('lightning-button');
        button[0].click();
        await flushPromises();
        button[1].click();
        await flushPromises();


    });

  

    it('wired method mocking',()=>{
        const element=document.body.querySelector('c-parents-component');
        
       
          getAccount.emit(mockGetAccount);
          getPicklistValues.emit(mockGetAccountType);
          getPicklistValues.emit(mockGetAccountIndustry);
        
          expect(element).toBeDefined();
    })
});