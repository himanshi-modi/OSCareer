const getRefreshTokenExpiryDate=()=>{
    return new Date(Date.now()+30*24*60*60*1000);
}

module.exports=getRefreshTokenExpiryDate;