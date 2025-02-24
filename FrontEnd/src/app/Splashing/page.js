'use client'; // Add this line to make this component a Client Component

import React ,{useState} from 'react'; // Custom CSS for additional animations (if needed)
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome icons
import confetti from 'canvas-confetti'; // Import canvas-confetti

const SplashPage = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name , setLastName] = useState("");
  const [email, setEmail ]=useState("")
  const [amount , setAmount] = useState(0);
  const sanitizedEmail = email.replace(/[^a-zA-Z0-9._-]/g, ''); // Remove invalid characters from email
  const tx_ref = `${sanitizedEmail}-txburusdf-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const public_key = 'CHAPUBK_TEST-XQxA1FKglJqifPTKFg1jBlNKYqHBlAgL'
    const triggerConfetti = () => {
        confetti({
          particleCount: 50, // Lower the number of particles
          angle: 90,
          spread: 50, // Reduce spread
          origin: { x: 0.5, y: 0.5 },
          colors: ['#ff0', '#ff6', '#ff8000', '#ff4d4d'],
        });
      };
      
    

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-yellow-400 to-teal-500 overflow-hidden">
      {/* Main Splash Container */}
      <div className="text-center p-8 rounded-lg bg-white shadow-lg relative space-y-8">
        
        {/* Lucky Me Title with Animation */}
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 animate-bounce">
          Lucky Me!
        </h1>

        {/* Rotating Lucky Icon with Tailwind Animation */}
        <div className="animate-rotateIcon">
          <i className="fa fa-shamrock text-6xl text-green-600" />
        </div>

        {/* Bouncing Lucky Icon with Tailwind Animation */}
        <div className="text-4xl animate-luckyIconAnimation">
          <i className="fa fa-certificate text-yellow-500" />
        </div>

        {/* Footer Text with Motion Effect */}
        <div className="text-lg text-gray-700 grid animate-pulse">
          <label htmlFor='input'>First Name</label><br></br>
          <input type='text' onChange={(e)=>{
            setFirstName(e.target.value)
          }}/>
            <label htmlFor='input'>Email </label><br></br>
          <input type='text' onChange={(e)=>{
            setEmail(e.target.value)
          }}/>
            <label htmlFor='input'>Last Name</label><br></br>
          <input  type='text' onChange={(e)=>{
            setLastName(e.target.value)
          }}/>
            <label htmlFor='input'>Amount</label><br></br>
          <input  type='number' onChange={(e)=>{
            setAmount(e.target.value)
          }}/>
        </div>

        {/* Button to Proceed */}
        <button
          className="px-6 py-3 mt-4 bg-teal-500 text-white rounded-full text-lg shadow-lg hover:bg-teal-600 focus:outline-none transition duration-300 transform hover:scale-105"
          onClick={triggerConfetti} // Trigger confetti on click
        >
 <form method="POST" action="https://api.chapa.co/v1/hosted/pay" >
    <input type="hidden" name="public_key" value={public_key} />
    <input type="hidden" name="tx_ref" value={tx_ref} />
    <input type="hidden" name="amount" value={amount} />
    <input type="hidden" name="currency" value="ETB" />
    <input type="hidden" name="email" value={email} />
    <input type="hidden" name="first_name" value={first_name} />
    <input type="hidden" name="last_name" value={last_name} />
    <input type="hidden" name="title" value="Let us do this" />
    <input type="hidden" name="description" value="Paying with Confidence with cha" />
    <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
    <input type="hidden" name="callback_url" value="https://example.com/callbackurl" />
    <input type="hidden" name="return_url" value="http://localhost:3000/" />
    <input type="hidden" name="meta[title]" value="test" />
    <button type="submit" className='  border-solid border-2xl border-slate-600 active:bg-slate-100' >Pay Now ✨</button>
</form>
        </button>
      </div>
    </div>
  );
};

export default SplashPage;
