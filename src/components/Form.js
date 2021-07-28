import React, { useState } from 'react'
import { storage } from '../firebase/firebase'


export default function Form(props) {
    const [item, setItem] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageUrl, setImageUrl] = useState("")

    console.log('image as file', imageAsFile);
    const handleImageAsFile = (event) => {
        const image = event.target.files[0]
        setImageAsFile(image)
    }

    const handleFireBaseUpload = (event) => {
        event.preventDefault()
        console.log('start of upload')
        if(imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
        } else {
            const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)

            uploadTask.on('state_changed',
                (snapShot) => {
                    //takes snap shot of the process as it is happening
                    console.log(snapShot)
                }, (error) => {
                    //catches the errors
                    console.log(error)
                }, () => {
                    //gets the functions from storage references the image storage in firebase
                    //get the download url then sets the image from friebase as the value
                    storage.ref('images').child(imageAsFile.name).getDownloadURL()
                        .then(fireBaseUrl => {setImageUrl(fireBaseUrl)})
                }
            )
        }
    }
    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     props.submitAction({
    //         item,
    //         price,
    //         description,
    //     })
    // }

    const handleChange = ({target}) => {
        switch(target.name) {
            case 'item':
                return setItem(target.value)
            case 'price':
                return setPrice(target.value)
            case 'description':
                return setDescription(target.value)
            // case 'image':
            //     return set_image_url(target.value)
            default:
                return ""    
        }
    }
    


    return( 

            <form className="item-form" onSubmit={handleFireBaseUpload}>
                <h2>Post an Item</h2>
                <label>
                    Item:
                    <input type="text" name="item" value={ item } onChange={handleChange} />
                </label>
                <label>
                    Image:
                    <input type="file" onChange={handleImageAsFile} />
                </label>
                {imageUrl === ''
                    ? null
                    : <img src={imageUrl} style={{width: 50, height: 50}} />}
                <label>
                    Price:
                    <input type="text" name="price" value={price === 0 ? "" : price} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" value={description} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
                {/* <input type="submit"/> */}
            </form>
        
    )
}
