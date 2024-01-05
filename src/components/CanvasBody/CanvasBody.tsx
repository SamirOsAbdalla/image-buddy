import { useEffect } from "react"
import ImageInput from "../ImageInput/ImageInput";
import "./CanvasBody.css"

interface Props {
    ctx?: CanvasRenderingContext2D
    setCtx: any,
    setInputColor: any
}
export default function CanvasBody({
    ctx,
    setCtx,
    setInputColor
}: Props) {

    let canvas: HTMLCanvasElement

    function inputPickColorCallback(rgbaStr: string, setInputColor: any) {
        setInputColor(rgbaStr)
    }

    function canvasClickCallback(event: any, setInputColor: any, ctx?: CanvasRenderingContext2D,) {

        if (setInputColor && ctx) {

            let canvas = document.getElementById("canvas") as HTMLCanvasElement
            pickColor(
                event,
                (rgbaStr: string) => {
                    inputPickColorCallback(rgbaStr, setInputColor)
                },
                ctx,
                canvas
            )
        }
    }

    useEffect(() => {

        canvas = document.getElementById("canvas") as HTMLCanvasElement
        let ctx = canvas.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D
        setCtx(ctx)

        canvas.addEventListener("mousemove", (event): any => {
            let hoveredColor = document.querySelector(".hovered__color") as HTMLDivElement
            hoveredColor.style.display = "flex"

            pickColor(
                event,
                (rgbaStr: string) => hoveredColor.style.backgroundColor = rgbaStr,
                ctx,
                canvas
            )
            setHoveredPosition(event, hoveredColor)
        })

        canvas.addEventListener("mouseleave", () => {
            let hoveredColor = document.querySelector(".hovered__color") as HTMLDivElement
            hoveredColor.style.display = "none"
        })


    }, [])


    const pickColor = (event: MouseEvent, setDestinationColor: any, ctx: CanvasRenderingContext2D, canvas?: HTMLCanvasElement) => {
        if (!ctx || !canvas) {
            return
        }

        const canvasBoundingRect = canvas.getBoundingClientRect()
        const horizontalOffset = event.clientX - canvasBoundingRect.left
        const verticalOffset = event.clientY - canvasBoundingRect.top

        const pixel = ctx.getImageData(horizontalOffset, verticalOffset, 1, 1)
        const pixelData = pixel.data
        const rgbaString = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3] / 255})`;

        setDestinationColor(rgbaString)
    }

    const setHoveredPosition = (event: MouseEvent, hoveredColor: HTMLDivElement) => {
        hoveredColor.style.left = `${event.pageX + 40}px`
        hoveredColor.style.top = `${event.pageY + 40}px`
    }

    return (
        <div>
            <ImageInput ctx={ctx} />
            <canvas
                onClick={(event: any) => {
                    canvasClickCallback(event, setInputColor, ctx)
                }}
                id="canvas">
            </canvas>
            <div className="hovered__color"></div>
        </div>
    )
}
