import { logout } from './actions'


export default function LogOut() {
  return (
    <div >
      
            <button
              formAction={logout}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-200"
            >
              התנתקות
            </button>
            
    </div>
  );
}

