public with sharing class AccountControllers {
   
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [
            Select Name, Type, Industry,CreatedDate from Account ORDER BY CreatedDate desc limit 10
            
        ];
    }
}