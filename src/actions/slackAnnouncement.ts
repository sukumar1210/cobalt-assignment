'use server'

export const sendNotifications = async ({name, email}: {name:string, email:string}) => {
  try {
    const res = await fetch('https://hooks.slack.com/services/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', {
      method: "POST", 
        
      // Adding body or contents to send 
      body: JSON.stringify({ 
          text: `Name: ${name}\nContact: ${email}`,  
      }), 
    })
    console.log(res);
    if (res.status!=200) throw new Error("Couldn't Send Notification")
  } catch (e:any) {
    return JSON.stringify({error: e.message})
  }

}