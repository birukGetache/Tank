"use client";
import BottomNavBar from '../components/BottomNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../../redux/counterSlice';
import { useEffect, useState } from 'react';

export default function Create() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.counter.users);
    const [file, setFile] = useState(null); // State to manage the selected file

    const handleSubmit = (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const fatherName = event.target.fatherName.value;

        if (file) {
            // Create a URL for the file
            const fileUrl = URL.createObjectURL(file);

            // Dispatch the addUser action with the file URL, username, and father's name
            dispatch(addUser({ username, fatherName, fileUrl }));

            // Clear the form fields and reset file state
            event.target.reset();
            setFile(null);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile); // Store the selected file in the state
    };

    return (
        <div className='h-screen bg-yellow-50 font-playfair flex items-center justify-center'>
            <div className='bg-[#85726a] bg-opacity-45 py-12 px-6 rounded-md box-border'>
                <div className='h-32 w-32 rounded-full bg-yellow-500 mx-auto -mt-28 flex justify-center items-center'>
                <div 
  className="h-28 w-28 relative rounded-full flex justify-end items-end"
  style={{
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: users.length > 0 ? `url(${users[0].fileUrl})` : 'none', 
    backgroundColor: users.length === 0 ? '#85726a' : 'transparent', // Add backgroundColor handling for when no users exist
  }}
>
                    {users.map((user, index) => (
                        <li key={index} >
                            {user.fileUrl && <img src={user.fileUrl} alt="Uploaded File" className="h-28 w-auto min-w-28 rounded-full" />}
                        </li>
                    ))}
                    <label className='cursor-pointer  rounded-full w-[30px] bg-slate-500  absolute bottom-0 right-0 h-[30px] flex items-center justify-center box-border'>
                   <i class="fas fa-plus text-center text-2xl w-full font-bold font-serif text-green-600 absolute"></i>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className='hidden'
                    />

                   
                    </label> 
                    </div>
                  
                </div>
                <h2>Add User</h2>
                <form onSubmit={handleSubmit} className='grid gap-6'>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                        required
                        className='rounded-md h-10 px-10 box-border mt-4  bg-opacity-20'
                    />
                    <input
                        type="text"
                        name="fatherName"
                        placeholder="Enter Father's Name"
                        required
                        className='rounded-md h-10 px-10 box-border bg-opacity-20'
                    />
                  
                   
                    <div className="flex items-center justify-center box-border p-2">
                        <button className="bg-gradient-to-r from-rose-500 via-blue-500 to-rose-500 text-white rounded-lg w-32 h-8 m-auto text-center cursor-pointer animate-gradient-motion bg-[length:400%_400%]" type="submit">
                            Add User
                        </button>
                    </div>
                </form>
                
                {/* Display User List
                <h3>User List:</h3>
                <ul>
                    {users.map((user, index) => (
                        <li key={index} className="mt-2">
                            <span>Username: {user.username}, Father's Name: {user.fatherName}</span>
                            {user.fileUrl && <img src={user.fileUrl} alt="Uploaded File" className="h-16 w-16 rounded-md ml-4" />}
                        </li>
                    ))}
                </ul> */}
            </div>
            <BottomNavBar />
        </div>
    );
}