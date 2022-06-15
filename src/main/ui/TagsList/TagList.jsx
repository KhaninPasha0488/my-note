import React, {useState} from 'react';
import {findTags} from "../../../utils/findTags";
import cl from "./TagList.module.scss"
import comm from "../commonstyle/Botton.module.scss";
import cominp from "../commonstyle/Input.module.scss";
import {Tag} from "./Tag";


export const TagList = ({tags, addTag, noteId, deleteTag}) => {
    const [isEdit, setIsEdit] = useState(false)
    const [tagValue, setTagValue] = useState('#')
    const save = () => {
        const tempTags = findTags(tagValue)
        if (tempTags?.length === 1) {
            if(tags.find(tag => tag.body === tempTags[0])){
                setTagValue('Error: you must enter a new tag')
            }
            else{
                addTag(noteId, tempTags[0])
                setIsEdit(false)
                setTagValue('')
            }

        } else if(tempTags?.length > 1) {
            setTagValue('Error: you can\'t add more than 1 tag')
        }
        else{
            setTagValue('Error: your tag must starts with "#"')
        }

    }
    return (
        <div className={cl.list}>
            {!isEdit ?
                <div className={cl.tags}>
                    {tags.map(tag =>
                        <Tag tag={tag} key={tag.id + Math.random()}
                             deleteTag={deleteTag}
                             noteId={noteId}
                        />
                    )
                    }

                </div> : <input className={cominp.input}
                    value={tagValue}
                    onChange={(e) =>
                        setTagValue(e.target.value)}/>}
            <div className={cl.button}>
                {!isEdit ? <button className={comm.button}
                        onClick={() => {
                        setIsEdit(true)
                    }}>Add tag</button>
                    : <>
                        <button
                            className={comm.button}
                            onClick={() =>
                        save()
                    }>Save</button><button
                        className={comm.button}
                        onClick={() => {
                        setTagValue('')
                        setIsEdit(false)
                    }
                    }>Back</button>
                    </>}
            </div>
        </div>
    );
};

