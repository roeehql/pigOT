import { ChangeEvent, useState } from 'react'

const useGetImageURL = (initialURL:string) => {
    const [imageURL, setImageURL] = useState(initialURL);
    const onFileChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {
          target: { files },
        } = event;
        let theFile;
        if(files !== null){theFile = files[0]};
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
          if(finishedEvent.target !== null && finishedEvent.target.result !== null){
            const {
              target: {result}
            } = finishedEvent;
              setImageURL(result.toString());
          }
        };
        if (Boolean(theFile) && theFile !== undefined) {
            reader.readAsDataURL(theFile);
        }
    };
    return {imageURL , setImageURL , onFileChange};
}

export default useGetImageURL;