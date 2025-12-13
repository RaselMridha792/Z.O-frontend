"use client";
import React, { useState, useEffect } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation'; // ✨ পরিবর্তন: useSearchParams আর প্রয়োজন নেই
import { useRouter } from 'next/navigation'; 
import { supabase } from '@/lib/supabaseClient'; 

export default function UpdatePasswordPage() {
    // const searchParams = useSearchParams(); // ✨ পরিবর্তন: এটি বাদ দেওয়া হলো
    const router = useRouter(); 
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [tokenReceived, setTokenReceived] = useState(false); // ফর্ম দেখানোর জন্য ব্যবহৃত স্টেট
    const [pageInitialized, setPageInitialized] = useState(false); // ✨ নতুন: পেইজ লোড হয়েছে কিনা বোঝার জন্য

    const updatePasswordWithToken = async (newPassword) => {
        // এই ফাংশনটি তখনই কাজ করবে যখন Supabase টোকেন পেয়ে ইউজারকে সেশন রিকভার করে দেবে।
        const { data, error } = await supabase.auth.updateUser({ 
            password: newPassword 
        });

        if (error) {
            throw new Error(error.message);
        }
        return data;
    };


    useEffect(() => {
        // ✨ পরিবর্তন: window.location.hash ব্যবহার করে টোকেন এক্সট্র্যাক্ট করা
        if (typeof window !== 'undefined') {
            const hash = window.location.hash; // #access_token=... এই স্ট্রিংটি নেবে
            
            if (hash) {
                const params = new URLSearchParams(hash.substring(1)); // # বাদ দিয়ে প্যারামিটার পার্স করা
                const token = params.get('access_token');
                
                if (token) {
                    // টোকেন পেলে Supabase অটোমেটিক সেশন সেট করে দেয়।
                    // আমরা শুধু টোকেন পেলাম কিনা তা চেক করছি।
                    setTokenReceived(true);
                    setMessage("আপনার অ্যাকাউন্ট যাচাই করা হয়েছে। নতুন পাসওয়ার্ড সেট করুন।");
                } else {
                    // টোকেন না থাকলে বা ভুল থাকলে
                    setTokenReceived(false);
                    setError("ত্রুটি: পাসওয়ার্ড রিসেট টোকেন পাওয়া যায়নি বা মেয়াদ উত্তীর্ণ হয়েছে।");
                }
            } else {
                // কোনো হ্যাশ প্যারামিটার না থাকলে
                setTokenReceived(false);
                setError("ত্রুটি: পাসওয়ার্ড রিসেট টোকেন পাওয়া যায়নি।");
            }
            
            setPageInitialized(true); // ✨ পেইজ ইনিশিয়ালাইজড হিসেবে চিহ্নিত করা হলো
        }
        
    }, []); // dependency array থেকে searchParams সরানো হলো

    // ✨ পরিবর্তন: পেজ ইনিশিয়ালাইজড না হওয়া পর্যন্ত লোডিং স্টেট দেখাও
    if (!pageInitialized) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <p className='text-xl text-gray-700'>লোডিং...</p>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        if (password !== confirmPassword) {
            setError('পাসওয়ার্ড এবং নিশ্চিত পাসওয়ার্ড মেলেনি।');
            setLoading(false);
            return;
        }
        
        // পাসওয়ার্ড কমপক্ষে 6 অক্ষরের হতে হবে (Supabase এর ডিফল্ট)
        if (password.length < 6) {
             setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
             setLoading(false);
             return;
        }

        try {
            // যদি টোকেনReceived true হয়, তবে Supabase এর সেশন রিকভার হয়ে গেছে
            // তাই আমরা সরাসরি updateUser ব্যবহার করতে পারি।
            await updatePasswordWithToken(password); 
            
            setMessage('পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে! এখন আপনি লগইন করতে পারেন।');
            setPassword('');
            setConfirmPassword('');
            
            // সফলভাবে আপডেট হওয়ার পর লগইন পেজে রিডাইরেক্ট
            // ৫ সেকেন্ড অপেক্ষা করার জন্য setTimeout ব্যবহার করা হলো
            setTimeout(() => {
                router.push('/login'); 
            }, 2000); 
            

        } catch (err) {
            // error.message-এ যদি "user is not signed in" থাকে, তার মানে সেশন রিকভার হয়নি।
            setError(err.message || 'পাসওয়ার্ড আপডেট করার সময় একটি ত্রুটি হয়েছে।');
        } finally {
            setLoading(false);
        }
    };

    const renderForm = () => (
        <form className='w-full space-y-6' onSubmit={handleSubmit}>
            <div className='form-control'>
                <label className='label'><span className='label-text font-semibold text-gray-700'>নতুন পাসওয়ার্ড</span></label>
                <input
                    type="password"
                    className='input input-bordered w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
                    minLength={6} // সর্বনিম্ন ৬ অক্ষর সেট করা হলো
                    required
                />
            </div>
            
            <div className='form-control'>
                <label className='label'><span className='label-text font-semibold text-gray-700'>পাসওয়ার্ড নিশ্চিত করুন</span></label>
                <input
                    type="password"
                    className='input input-bordered w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="পুনরায় পাসওয়ার্ড লিখুন"
                    required
                />
            </div>
            
            <button 
                className='w-full btn bg-blue-600 text-white hover:bg-blue-700 font-bold py-2 rounded-lg transition duration-200' 
                type="submit" 
                disabled={loading || !tokenReceived}
            >
                {loading ? "আপডেট হচ্ছে..." : "পাসওয়ার্ড আপডেট করুন"}
            </button>

            <div className='text-center mt-4'>
                <a href="/login" className="text-sm text-blue-600 hover:underline">
                    লগইন পেজে ফিরে যান
                </a>
            </div>
        </form>
    );

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl'>
                <h2 className='text-3xl font-extrabold text-center text-gray-900'>
                    পাসওয়ার্ড রিসেট
                </h2>
                
                {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
                {message && <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">{message}</div>}

                {/* টোকেন পেলে ফর্ম দেখাও, অন্যথায় মেসেজ দেখাও */}
                {tokenReceived ? (
                    renderForm()
                ) : (
                    <div className="text-center text-gray-600">
                        পাসওয়ার্ড রিসেট করার জন্য আপনার ইমেল ইনবক্সে পাঠানো লিঙ্কটি ব্যবহার করুন।
                    </div>
                )}
            </div>
        </div>
    );
}