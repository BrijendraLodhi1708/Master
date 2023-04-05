import { LightningElement,wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { createRecord} from 'lightning/uiRecordApi';
import getAccount from '@salesforce/apex/AccountControllers.getAccounts';
//const fieldArrays =['Account.Name','Account.Type','Account.Industry']
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const FIELDS =[
    {label:'Account Id' ,type:'text' , fieldName: 'Id'},
    {label:'Account Name' ,type:'text' , fieldName: 'Name'},
    {label:'Account Type' ,type:'Picklist' , fieldName: 'Type'},
    {label:'Account Industry' ,type:'Picklist' , fieldName: 'Industry'},
    {label:'Account CreatedDate' ,type:'datetime' , fieldName: 'CreatedDate'}
]

export default class ParentsComponent extends LightningElement {
     recordId;
   
    name;
   flag=false;
   fields=FIELDS
    accountType;
    typeValue;

    accountIndustry;
    industryValue;

    accounts=[];

    @wire(getAccount)
    account({data,error})
    {
        if(data){
            this.accounts=data;
            console.log('Account Data',this.accounts)
            console.log('Account',JSON.stringify(this.accounts))
           
           // this.dispatchEvent(event1);
            //console.log('Cases Filtered',);
        }else{
            console.log('Error',error);
        }
    }
    
   displayAccount(){
    this.flag=true;
   }
    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: TYPE_FIELD })
    typePicklistValue ({error,data})
    {
        if(data)
        {
            console.log('Picklist  data',JSON.stringify(data));
            console.log('Picklist values type',data.values);
            console.log('Picklist values type string',JSON.stringify(data.values));
            this.accountType=data.values;
            
        }
        else 
        {
            console.log(error);
        }
    }
  
    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: INDUSTRY_FIELD })
    industryPicklistValue ({error,data})
    {
        if(data)
        {
            console.log('Picklist  data',JSON.stringify(data));
            console.log('Picklist values industry',data.values);
            console.log('Picklist values industry string',JSON.stringify(data.values));
            this.accountIndustry=data.values;
            
        }
        else 
        {
            console.log(error);
        }
    }

    handleComboboxChange1(event){

        this.industryValue=event.detail.value;

        console.log('Account Industry',this.industryValue);
    }
    handleComboboxChange(event){

        this.typeValue=event.detail.value;

        console.log('Account Type',this.typeValue);
    }

    createAccount(){
       // console.log('2')
        const child=this.template.querySelector('c-childs-component');
        this.name=child.accountName;
       //console.log('1',this.name)
        const fields={'Name':this.name,'Type':this.typeValue,'Industry':this.industryValue}
        const recordInput={apiName:'Account',fields};
        console.log('fields',fields)
        createRecord(recordInput).then(response=>{
            this.recordId=response.id
            const event1 = new ShowToastEvent({
                title: 'Success!',
                message: 'Records created successfully ',
                variant:'Success',
                messageData: [
                    'Salesforce',
                    {
                        url: 'http://www.salesforce.com/',
                        label: 'here',
                    },
                ],
            });
            this.dispatchEvent(event1)
        }).catch(error =>{
            console.log('error in body',error)
        })
    }
    
}