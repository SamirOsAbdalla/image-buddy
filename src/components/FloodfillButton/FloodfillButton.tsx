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

            console.log(g)
            if (g > 100) {

                data[i] = 255;
                data[i + 1] = 255 // green is set to 100%
                data[i + 2] = 255; // blue is set to 100%
                // resulting color is white
            }
        }

        ctx.putImageData(image, 0, 0)
    }
    return (
        <button onClick={replaceImageColor}>Replace color</button>
    )
}
