import "./FloodfillButton.css"


interface Props {
    ctx: CanvasRenderingContext2D,
    replacedColor: string,
    replacementColor: string,
    setCtx: any
}

export default function FloodfillButton({
    ctx,
    replacedColor,
    replacementColor,
    setCtx
}: Props) {

    let replacedColorArr = replacedColor.substring(5, replacedColor.length - 1).split(",").map(pixelVal => parseInt(pixelVal))
    let replacementColorArr = replacementColor.substring(5, replacementColor.length - 1).split(",").map(pixelVal => parseInt(pixelVal))
    function replaceImageColor() {
        if (!replacedColor || !replacementColor) {
            return
        }

        const { width, height } = document.getElementById("canvas") as HTMLCanvasElement
        const image = ctx.getImageData(0, 0, width, height)
        const { data } = image;
        const { length } = data;



        for (let i = 0; i < length; i += 4) {
            const r = data[i + 0];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            if (Math.abs(replacedColorArr[0] - r) < 10 && Math.abs(replacedColorArr[1] - g) < 10 && Math.abs(replacedColorArr[2] - b) < 10) {
                data[i] = replacementColorArr[0]
                data[i + 1] = replacementColorArr[1]
                data[i + 2] = replacementColorArr[2]
            }

        }

        ctx.putImageData(image, 0, 0)
    }
    return (
        <button onClick={replaceImageColor}>Replace color</button>
    )
}
