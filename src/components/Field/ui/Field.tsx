'use client'

import {FieldStyle} from "../styles";

type FieldPropsType = {
    onChange?: (data: string) => void,
    label?: string,
    type?: HTMLInputElement['type'],
}

export default function Field({onChange, label, type}: FieldPropsType) {
    return (
        <div className={FieldStyle.field}>
            <label className={FieldStyle.label}>{label}</label>
            <input onChange={(e) => onChange && onChange(e.target.value)} type={type} className={FieldStyle.input}/>
        </div>
    )
}