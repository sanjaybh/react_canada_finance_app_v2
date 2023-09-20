import signup from '../../assets/signup.png';
import welcome from '../../assets/welcome.png';

export default function Info({title = ""}) {
  return (
    <div className="p-6 mr-2 bg-gray-100 sm:rounded-lg">
        <h1 className="text-3xl sm:text-4xl text-gray-800 font-extrabold tracking-tight">
            {title}:
        </h1>
        <p className="text-normal text-lg sm:text-xl font-medium text-gray-600 mt-2">
        {title ==="Login" ? "Welcome Back !!!" : "Sign up for free account" }
        </p>
        <br />
        {title ==="Login" ? <img src={welcome} alt="welcome" height={300} width={300} /> : <img src={signup} alt="signup" height={300} width={300} />}
        
    </div>
  )
}
