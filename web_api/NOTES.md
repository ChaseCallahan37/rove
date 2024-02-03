## Mix commandds
### Creating a new model with associated api routes
#### Event model
    mix phx.gen.json Events Event events title:string date:date latitude:float longitude:float
#### Account Model
    mix phx.gen.json Accounts Account account email:string hash_password:string
#### User Model
    mix phx.gen.json Users User user account_id:references:accounts full_name:string gender:string biography:text