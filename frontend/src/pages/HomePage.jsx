import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import axios from 'axios';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard'
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';

const homepage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                // fetch
                // const res = await fetch("http://localhost:5001/api/notes")
                // const data = await res.json();

                // axios
                const res = await api.get("/notes");

                console.log(res.data)

                setNotes(res.data)
                setIsRateLimited(false);
            } catch (error) {
                console.error("Error fetching notes.", error);
                if (error.response.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load notes")
                }

            } finally {
                setLoading(false);
            }

        }

        fetchNotes();
    }, [])

    return (
        <div className='min-h-screen'>
            <Navbar />

            {isRateLimited && <RateLimitedUI />}

            <div className='max-w-7xl mx-auto p-4 mt-6'>
                {loading && <div data-theme='forest' className='bg-transparent text-center text-primary py-10'>Loading notes...</div>}

                {notes.length === 0 && !isRateLimited && !loading && <NotesNotFound />}

                {notes.length > 0 && !isRateLimited && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {notes.map((note)=>(
                            <NoteCard key={note._id} note={note} setNotes={setNotes} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default homepage