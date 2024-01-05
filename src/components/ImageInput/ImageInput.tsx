import React from 'react'

interface Props {
    ctx?: CanvasRenderingContext2D
}
export default function ImageInput({
    ctx
}: Props) {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, ctx?: CanvasRenderingContext2D) => {
        const fileReader = new FileReader()
        fileReader.onload = () => {

            const img = new Image();
            img.src = fileReader.result as string

            img.onload = () => {
                if (!ctx) {
                    return
                }


                ctx.drawImage(img, 0, 0);
                img.style.display = "none";
            }

        }
        if (e.target.files) {
            fileReader.readAsDataURL(e.target.files[0])
        }
    }

    return (
        <input
            className="image__input"
            type="file"
            placeholder="Choose Image"
            accept='.jpg'
            onChange={(e) => handleFileChange(e, ctx)}
        />
    )
}
