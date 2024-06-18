<h1>Auth and reg function</h1>
<h2>This function can be used to verify if the user is valid or not</h2>
<h2>This consist in: </h2>
<h4>- first_name</h4>
<h4>- last_name</h4>
<h4>- email (this is always needed)</h4>
<h4>- age</h4>
<h4>- dni</h4>
<h4>- password (this is always needed)</h4>
<h4>- secondpassword</h4>

<h2 style="color: red;"> - WARNING: some of them can only be used if in the user example you accepted them, for example: </h2>
secondpassword:{
    accepted:true,
    nameLength:10,
    specialChar:true,
    numbers:true,
    mayus:true,
    }
<br>
<h3>This variables can change or make new ones, with the userExample you can understad easily how it works: </h3>
<br>
<h2> User example </h2>
<h4>- numbers (if there are any numbers will send an error)</h4>
<h4>- mayus (if there are any mayus will send an error)</h4>
<h4>- specialChar (if there are any special char will send an error)</h4>
<h4>- accepted (some of the example need to be accepted,like secondpassword or dni)</h4>
<h4>- domains (if there are a non-supported domain will throw an error)</h4>
<h4>- TLD (TLD(top-level domain example: .ar,.mx,...etc))</h4>
<h4>- DNIlength (is the length of your DNI or ID of your country, its by default 8)</h4>
<h4>- range (its the range of age, its by default from 1 / to 100)</h4>
<h4>- nameLength (its the max-length of a username can be, its by default 10 )</h4>
<br>
<h3>all of this can be change and whats more importante, they can be manage as you want</h3>
<br>
<br>
<h2>OtherConfig is for more especific tasks, here the example: </h2>
otherConfig={
    importantValuesArry:[],
    otherFunci:{
        acceptedKeys:[],
        funcions:[]
    },
    neededValues:[],
    DTO:DTO_User_Built_In(),}
<br>
<h4>importantValuesArry (You can add more values that always, this is the same as accepted)</h4>
<h4>otherFunci (functions ts an array, you can add as many as you want, but you will have to accept the key(email) and value(john@doe</h4>
<h4>acceptedKeys its a string array ("email"), this is for the keys that want it to be used in)</h4>
<h4>neededValues (this is not recommended but, you can change the needed ones like password and email (["email","password"]))</h4>
<h4>DTO (its for your own DTO if you need an extra value, also we have one built in)</h4>


