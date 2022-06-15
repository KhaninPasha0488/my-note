import React, {useState} from 'react';
import s from "./Note.module.scss"
import comm from "../commonstyle/Botton.module.scss"
import {EditNote} from "./EditNote";
import {TagList} from "../TagsList/TagList";


export const Note = ({id, description, tagList, deleteNote, editNote, addTag, deleteTag}) => {
    const [isEdit, setIsEdit] = useState(false)

    return (
        <div className={s.noteOuterWrapper}>
            {!isEdit && <div className={s.noteInnerWrapper}>
                <div className={s.note}>
                    <div className={s.noteBody}>

                        <div className={s.noteDescription}>
                            {description}
                        </div>
                    </div>
                </div>
                <div className={s.noteButtons}>
                    <div className={s.btnDefault}><button className={comm.button}
                        onClick={() => {
                        setIsEdit(true)
                    }}>Edit</button>
                        <button className={comm.button}
                                onClick={() => {
                            deleteNote(id)
                        }}>Delete</button></div>
                </div>
            </div>}
            {isEdit && <EditNote cancel={setIsEdit}
                                 id={id} description={description} edit={editNote} tagList={tagList} addTag={addTag}/>}
            <TagList tags={tagList} addTag={addTag} noteId={id} deleteTag={deleteTag}/>
        </div>
    );
};

