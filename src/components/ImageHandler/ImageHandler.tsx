import { useState } from "react"
import "./ImageHandler.css"
import CanvasBody from "../CanvasBody/CanvasBody"

export default function ImageHandler() {

    const [ctx, setCtx] = useState<CanvasRenderingContext2D | undefined>(undefined)
    const [focusedInput, setFocusedInput] = useState<"inputOne" | "inputTwo" | undefined>(undefined)

    const [input1Val, setInput1Val] = useState<string>("")
    const [input2Val, setInput2Val] = useState<string>("")

    return (
        <div>
            <CanvasBody
                ctx={ctx}
                setCtx={setCtx}
                setInputColor={focusedInput ? (focusedInput == "inputOne" ? setInput1Val : setInput2Val) : undefined}
            />
            <div>
                <input type="text" className={`${focusedInput == "inputOne" ? "focused__input" : ""}`} onClick={() => setFocusedInput("inputOne")} value={input1Val} onChange={(e) => setInput1Val(e.target.value)} placeholder="Replaced color" />
                <input type="text" className={`${focusedInput == "inputTwo" ? "focused__input" : ""}`} onClick={() => setFocusedInput("inputTwo")} value={input2Val} onChange={(e) => setInput2Val(e.target.value)} placeholder="Replacement color" />
            </div>
            <button>Replace Color</button>
        </div>
    )
}
