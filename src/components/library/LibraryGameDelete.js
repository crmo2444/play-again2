import { CgCloseR } from 'react-icons/cg'
import { IconContext } from "react-icons";

export const LibraryGameDelete = ({id, setEmpty, setLibrary}) => {
    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    const handleDeleteGame = () => {
        fetch(`http://localhost:8088/libraryGames/${id}`, { method: "DELETE" })
        .then(
            () => {
                fetch(`http://localhost:8088/libraryGames?userId=${localUserObject.id}`)
                .then(response => response.json())
                .then((data) => {
                    if(data.length !== 0) {
                        setLibrary(data)
                    }
                    else {
                        setEmpty(false)
                    }
                })
            }
        )
    }

    return <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "30"}}>
    <div>
      <CgCloseR onClick={(event) => {handleDeleteGame(event)}}/>
    </div>
  </IconContext.Provider>
}