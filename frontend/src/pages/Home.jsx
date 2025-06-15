import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import axios from "axios"
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";

const Home = () => {
    const [isRateLimited,setIsRateLimited] = useState(false)
    const [notes,setNotes] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes")
                console.log(res.data)
                // setTimeout(() => {
                //     setNotes(res.data);
                //     setIsRateLimited(false);
                //     setLoading(false)
                // }, 1500);
                setNotes(res.data);
                setIsRateLimited(false);
                setLoading(false)
            } catch (error) {
                console.log("Error fetching notes", error)
                if(error.response.status === 429){
                    setIsRateLimited(true)
                }else{
                    toast.error("Failed to load notes")
                }
                setLoading(false)
            }
        }
        fetchNotes();
    },[]);

    return (
        <div className="min-h-screen">
            <Navbar/>
            {isRateLimited && <RateLimitedUI/>}
            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && <div className="text-primary flex items-center justify-center gap-3 py-10">
                    <span className="loading loading-dots loading-lg"></span>
                    <span className="text-lg leading-none">Loading Notes...</span>
                </div>}

                {!loading && notes.length==0 && !isRateLimited && <NotesNotFound/>}

                {notes.length>0 && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map(note => 
                            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;