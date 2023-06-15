
const exp=require("express")
const userapp=exp.Router()
const expressAsyncHandler=require("express-async-handler")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const verifytoken=require("./middlewares/verifyToken")

//creating a user api 

userapp.get("/get-users",verifytoken,expressAsyncHandler(async(request,response)=>{
    // get usercollection
    const userCollection=request.app.get("userCollection")
   let users=await userCollection.find({role:"employee"}).toArray()
   response.status(200).send({message:"users list",payload:users})
    
  }))

userapp.get("/get-user/:username",verifytoken,expressAsyncHandler(async(request,response)=>{
    // get usercollection
    const userCollection=request.app.get("userCollection")
  let userObj=await userCollection.findOne({username:(request.params.username)})
  response.status(200).send({message:"user list",payload:userObj})
  }))



// json to java script obj
userapp.use(exp.json())
userapp.post("/create-user",verifytoken,expressAsyncHandler(async(request,response)=>{
  
    // get userCollection
    const userCollection=request.app.get("userCollection")
    //    get user from req
    const newuser=request.body;
    // save or insert or create a newuser in userCollection
    await userCollection.insertOne(newuser)
    response.status(201).send({message:"user has been created"})
  
  
  }))

userapp.put("/update-task/:username",verifytoken,expressAsyncHandler(async(request,response)=>{
 
    // get userCollection
    const userCollection=request.app.get("userCollection")
    let task=request.body;
     await userCollection.updateOne({username:(request.params.username)},{$addToSet:{tasks:task}})
      response.status(200).send({message:"task has been added successfully"})
    
  }))
  userapp.put("/update-user/:username", verifytoken, expressAsyncHandler(async (req, res) => {
    // Get usersCollectionObj
    let userCollection = req.app.get("userCollection");
    // Get username from URL
    console.log(req.params);
    let usernameOfUrl = req.params.username;
    console.log(usernameOfUrl);
    // Get modified user from client
    let modifiedUser = req.body;
    let hashedPassword= await bcryptjs.hash(modifiedUser.password,6)
          modifiedUser.password=hashedPassword;
    delete modifiedUser.name;
    console.log(modifiedUser);
    // Update
    let userObj = await userCollection.findOne({ username: usernameOfUrl });
    console.log(userObj);
    await userCollection.updateOne(
      { username: usernameOfUrl },
      {
        $set: {
          ...modifiedUser,
        },
      }
    );
    // Send response
    res.send({ message: "User update success" });
  }));
  
  
  
  
userapp.delete("/delete-user/:username",verifytoken,expressAsyncHandler(async(request,response)=>{
   
    // get userCollection
   const userCollection=request.app.get("userCollection")
     await userCollection.deleteOne({username:request.params.username})
    
      response.status(200).send({message:"user has been deleted successfully"})
   
    
  }))


userapp.use(exp.json())
userapp.post("/add-user",expressAsyncHandler(async(request,response)=>{
      const userCollection=request.app.get("userCollection")
      
      const newUser=request.body

      const userOfDB=await userCollection.findOne({username:newUser.username})
      const userOfEmail=await userCollection.findOne({email:newUser.email})
         if(userOfDB!==null){
          response.status(200).send({message:"user already exists"})
         }
         else if(userOfEmail!==null){
          response.status(200).send({message:"user email already exists"})
         }
         else{
          let hashedPassword= await bcryptjs.hash(newUser.password,6)
          newUser.password=hashedPassword;
          await userCollection.insertOne(newUser)
          response.status(201).send({message:"user created"})
      
      
      }
         
      
  }))


 userapp.use(exp.json())
userapp.post('/user-login',expressAsyncHandler(async(request,response)=>{

  //get userCollectionObj
  const userCollection=request.app.get("userCollection")

  //get user credentials from req
  const userCredObj=request.body;

  //verify username
  let userOfDB=await userCollection.findOne({username:userCredObj.username})

  //if username is invalid
  if(userOfDB===null){
   response.status(200).send({message:"Invalid username"})
  }
  //if username is valid
  else{
   //verify password
   let isEqual=await bcryptjs.compare(userCredObj.password,userOfDB.password)
   //if passwords not matched
   if(isEqual===false){
     response.status(200).send({message:"Invalid password"})
   }
   //if passwords matched
   else{
     //create a JWT token
       let jwtToken=jwt.sign({username:userOfDB.username},'123456789',{expiresIn:"1d"})
     //send token in response
     response.status(200).send({message:"success",token:jwtToken,user:userOfDB})
   }
  }
 
}))





module.exports=userapp