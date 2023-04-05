trigger UpdateAccountOwner on UserTerritory2Association (after insert , after update) {
    
          
    List<UserTerritory2Association> usrid =new List<UserTerritory2Association>(
    [ SELECT UserId , Territory2Id FROM UserTerritory2Association ]);
    
    List<ObjectTerritory2Association> objId= new List<ObjectTerritory2Association>(
    [SELECT ObjectId FROM ObjectTerritory2Association]);
    
       List<Account> acc = new List<Account>(
       [SELECT id from Account]);
    
    List<Account> Accc= new List<Account>();
        for(UserTerritory2Association us: usrId){
            for(ObjectTerritory2Association ob: objId){
                
                for(Account a: acc){
                    if(a.id==ob.ObjectId){
                        
                        a.OwnerId=us.UserId;
                        
                       
                    }
                    update a;
                }
            }
        }
   
}