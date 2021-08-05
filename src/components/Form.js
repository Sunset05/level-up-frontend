import React, { useState } from "react"
import { storage } from "../firebase/firebase"
import { useHistory } from "react-router-dom"

export default function Form(props) {
    const [item, setItem] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [imageAsFile, setImageAsFile] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [alert, setAlert] = useState("")
    
    const author = props.user
    const history = useHistory()

    const handleImageAsFile = (event) => {
        const image = event.target.files[0]
        setImageAsFile(image)
    }

    const handleFireBaseUpload = (event) => {
        event.preventDefault()
        // console.log("start of upload")
        if(imageAsFile === "") {
            console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
        } else {
            const uploadTask = storage.ref(`/images/${ imageAsFile.name }`).put(imageAsFile)
            uploadTask.on("state_changed",
                (snapShot) => {
                    console.log(snapShot)
                }, (error) => {
                    console.log(error)
                }, () => {
                    storage.ref("images").child(imageAsFile.name).getDownloadURL()
                        .then(fireBaseUrl => {
                            setImageUrl(fireBaseUrl)
                            fetch("http://localhost:9000/listings", {
                                method: "POST",
                                headers: {
                                    "Authorization": `Bearer ${localStorage.token}`,
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    listing:{
                                        item,
                                        price,
                                        description,
                                        image_url: fireBaseUrl,
                                        author
                                    }
                                })
                            })
                        })
                        .then(() => {
                            setAlert("post uploaded! Submit another?")
                        })
                }
            )
        }
    }

    const handleChange = ({ target }) => {
        switch(target.name) {
            case "item":
                return setItem(target.value)
            case "price":
                return setPrice(target.value)
            case "description":
                return setDescription(target.value)
            default:
                return ""    
        }
    }

    const renderAlertMessage = () => {
        return <p>{ alert }</p>
    }

    return( 
        <form className="item-form" onSubmit={ handleFireBaseUpload }>
            <h2>Post an Item</h2>
            <label>
                Item:
                <input 
                    type="text" 
                    name="item" 
                    value={ item } 
                    onChange={ handleChange } 
                />
            </label>
            <label>
                Image:
                <input 
                    type="file" 
                    onChange={ handleImageAsFile } 
                />
            </label>
            { imageUrl === ""
                ? null
                : <img src={ imageUrl } style={ {width: 50, height: 50} } alt="firebase url"/> 
            }
            <label>
                Price:
                <input 
                    type="text" 
                    name="price" 
                    value={ price === 0 ? "" : price } 
                    onChange={ handleChange } 
                />  
            </label>
            <label>
                Description:
                <input 
                    type="text" 
                    name="description" 
                    value={ description } 
                    onChange={ handleChange } 
                />
            </label>
            <button type="submit">Submit</button>
            {alert === ""
                ? null
                : renderAlertMessage()
            }
            {
                alert === ""
                ? null
                :  <button onClick={()=>history.go(0)}>Submit Another Listing</button>
            }
        </form>
    )
}
