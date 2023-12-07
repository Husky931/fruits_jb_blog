// utils.ts
export async function processImage(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const img = new Image()
            img.onload = () => {
                const canvas = document.createElement("canvas")
                const ctx = canvas.getContext("2d")!

                let width = img.width
                let height = img.height
                const maxWidth = 800
                const maxHeight = 800

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height *= maxWidth / width))
                        width = maxWidth
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width *= maxHeight / height))
                        height = maxHeight
                    }
                }

                canvas.width = width
                canvas.height = height
                ctx.drawImage(img, 0, 0, width, height)

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob)
                        } else {
                            reject(
                                new Error("Canvas to Blob conversion failed")
                            )
                        }
                    },
                    "image/webp",
                    0.8
                )
            }
            img.onerror = () => reject(new Error("Image loading error"))
            if (e.target?.result) {
                img.src = e.target.result.toString()
            }
        }
        reader.onerror = () => reject(new Error("FileReader error"))
        reader.readAsDataURL(file)
    })
}
