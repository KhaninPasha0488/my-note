import React, { useState} from 'react';
import s from "./EditNote.module.scss";
import ids from "../commonstyle/Botton.module.scss";
import {findTags} from "../../../utils/findTags";
import {HighlightWithinTextarea} from "react-highlight-within-textarea";
import {useFindWords} from "../../../hook/useFindWords";

export const EditNote = ({id, description, cancel, edit, tagList, addTag}) => {
    const [text, setText] = useState(description)
    const onChange = (text) => setText(text)
    const editDescription = () => {
        const tempTags = findTags(text)
        let noRepeatArray = []
        if (tempTags) {
            tagList.forEach(({body}) => {
                noRepeatArray.push(body)
            })
            noRepeatArray = Array.from(new Set([...noRepeatArray, ...tempTags]))
            addTag(id, noRepeatArray)
            edit(id, text, noRepeatArray)
        } else {
            edit(id, text)
        }
    }

    const highlightTemplate = useFindWords(tagList, text)
    return (
        <div className={s.editNote}>
            <div className={s.body}>
                <div className={s.textArea}>
                    <HighlightWithinTextarea placeholder='description' value={text}
                                             onChange={onChange}
                                             highlight={highlightTemplate}

                    />
                </div>
            </div>
            <div className={s.buttons}>
                <button className={ids.button}
                        onClick={() => {
                            editDescription()
                            cancel(false)
                        }}>Save
                </button>
                <button className={ids.button}
                    onClick={() => {
                    cancel(false)
                }}>Cancel</button>
            </div>
        </div>
    );
};

