export default function swDev (){
    let swUrl = `./sw.js`
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register(swUrl).then((response)=>{
            console.log("response" , response)
        })
    }
}