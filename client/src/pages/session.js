import React from 'react'

 let expire = false
export default function Session() {
   
  function getPayload(jwt){
    return atob(jwt.split(".")[1])
  }
  const token = localStorage.getItem("token")
  if(token!=null){
  const payload = getPayload(token);
  
  const expiration = new Date(payload.exp);
  const now = new Date();
  const fiveMinutes = 1000 * 60 * 5;
  expire=expiration.getTime() - now.getTime() < fiveMinutes
}
  return (
    <>
      <div>
      {expire ? 
      ( 
        <div style={{ backgroundColor: '#29F0B5', height: '1.5cm', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ color: 'white' }}>Your session is about to end. <a href="/login">go to the login Page</a></span>
        </div>
      )
      :(<div></div>)}
      </div>  
    </>
  )
}