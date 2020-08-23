import React, {useEffect, useState} from 'react';
import './App.css';
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import axios from "axios"

const myTheme = {
    // Theme object to extends default dark theme.
};
export const AUTH_KEY = "authKey";

function App() {
    const [loadUrl, setLoadUrl] = useState(null)
    useEffect(()=>{
        let url_string = window.location.href;
        let url = new URL(url_string);
        axios({
            url: url.searchParams.get("loadUrl"),
            method: 'GET',
            responseType: 'blob',
            headers: {
                Authorization: 'Basic ' + localStorage.getItem(AUTH_KEY),
            }
        }).then(res => {
            console.log("res", res)
            setLoadUrl(window.URL.createObjectURL(new Blob([res.data])));
        }).catch(err => {
            console.error(err)
        });

    }, [])
    const editorRef = React.createRef();
    return (
        <div data-test="appComponent">
            {loadUrl ? <ImageEditor
                ref = {editorRef}
                includeUI={{
                    loadImage: {
                        path: loadUrl,
                        name: 'SampleImage'
                    },

                    theme: myTheme,
                    menu: ['shape', 'filter'],
                    initMenu: 'filter',
                    uiSize: {
                        width: '1000px',
                        height: '700px'
                    },
                    menuBarPosition: 'bottom'
                }}
                cssMaxHeight={500}
                cssMaxWidth={700}
                selectionStyle={{
                    cornerSize: 20,
                    rotatingPointOffset: 70
                }}
                usageStatistics={true}
            /> : <p>Loading</p> }
        </div>
    );
}

export default App;
