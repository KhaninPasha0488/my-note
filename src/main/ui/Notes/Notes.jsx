import {useEffect, useMemo, useState} from "react";
import {findTags} from "../../../utils/findTags";
import s from "./Notes.module.scss"
import {Note} from "./Note";
import comm from "../commonstyle/Botton.module.scss";
import comtext from "../commonstyle/TexyArea.module.scss"
import cominp from "../commonstyle/Input.module.scss"
import {createId} from "../../../utils/createId";


export const Notes = ({data}) => {
    const [notes, setNotes] = useState(data)
    const [newNotice, setNewNotice] = useState('')
    const [query, setQuery] = useState('')
    const addTag = (id, tag) => {
        if (Array.isArray(tag)) {
            setNotes(notes.map(note => {
                return id !== note.id ? note : {
                    ...note,
                    tags: [...note.tags, tag.map(item => ({id: createId, body: item}))]
                }
            }))
        } else {
            setNotes(notes.map(note => {
                return id !== note.id ? note : {...note, tags: [...note.tags, {id: createId(), body: tag}]}
            }))
        }
    }
    const deleteTag = (id, tagId) => {
        setNotes(notes.map(note => {
            return id !== note.id ? note : {...note, tags: [...note.tags.filter(tag => tagId !== tag.id)]}
        }))
    }
    const addNote = () => {
        const tagsBodies = findTags(newNotice)
        let tagArrayObjects = []
        if (tagsBodies) {
            tagArrayObjects = tagsBodies.map(tag => ({id: createId, body: tag}))
        }
        const note = {id: createId(), description: newNotice, tags: tagArrayObjects}
        setNotes([ note,...notes])
        setNewNotice('')
    }
    const searchNotes = useMemo(() => {
        let searchArray = notes
        const tags = findTags(query)
        if (tags) {
            let tagsQr = tags.sort().join('')
            searchArray = notes.filter(note => {
                let noteQr = note.tags.map(tag => tag.body).sort().join('')
                return noteQr.includes(tagsQr)
            })
        }
        return searchArray
    }, [query, notes])
    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id))
    }
    const editNote = (id, description, tags) => {
        if (Array.isArray(tags)) {
            setNotes(notes.map(note => {
                return id !== note.id ? note : {
                    id,
                    description,
                    tags: tags.map(tag => ({id: createId(), body: tag}))
                }
            }))
        } else {
            setNotes(notes.map(note => {
                return id !== note.id ? note : {id, description, tags: [...note.tags]}
            }))
        }

    }

    return (
        <div className={s.notes}>
            <div className={s.newNoteAndTag}>
                <div className={s.newNote}>
                <textarea className={comtext.textarea}
                          placeholder="new note"
                          onChange={(e) => setNewNotice(e.target.value)}
                          value={newNotice}/>
                    <button className={comm.button} onClick={() => addNote()}>Create note</button>
                </div>
                <div className={s.filter}>
                    <input className={cominp.input}
                           placeholder="search by #tags"
                           onChange={(e) => setQuery(e.target.value)}
                           value={query}/>
                </div>
            </div>
            {searchNotes.map(note =>
                <Note {...note} key={note.id}
                      tagList={note.tags}
                      editNote={editNote}
                      deleteNote={deleteNote}
                      addTag={addTag}
                      deleteTag={deleteTag}
                />
            )}
        </div>
    );
};

