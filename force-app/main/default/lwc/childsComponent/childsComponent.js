import { LightningElement } from 'lwc';

export default class ChildsComponent extends LightningElement {

     accountName;

    handleName(event){

        this.accountName=event.detail.value;
    }

}