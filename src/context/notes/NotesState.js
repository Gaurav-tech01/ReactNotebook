import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const [notes, setnotes] = useState([])
    //Get All Notes
    const getNotes = async () => {
        const response = await fetch(`${host}/notes/fetchall`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json()
        console.log(json)
        setnotes(json)
    }
    //Add a Note
    const addNote = async (title, description, tag) => {
        //TODO: API Call
        const response = await fetch(`${host}/notes/addNotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        console.log(json)

        console.log("Adding a new note")
        setnotes(notes.concat(json))
    }

    //Delete a Note
    const deleteNote = async (id) => {
        //TODO: API Call
        const response = await fetch(`${host}/notes/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json)
        console.log("Deleting the note with id" + id)
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setnotes(newNotes)
    }

    //Edit a Note
    const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/notes/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        console.log(json)
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag
            }
        }
        getNotes()
    }
    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState