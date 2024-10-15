import React,{useState, useEffect} from 'react'
import FroalaEditor from "react-froala-wysiwyg"
import Froalaeditor from "froala-editor"
import FroalaEditorComponent from 'react-froala-wysiwyg'
import { Box, Button, HStack } from "@chakra-ui/react"
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/save.min.js';
import 'froala-editor/js/plugins/markdown.min.js';
import 'froala-editor/js/plugins/code_view.min.js';
import 'froala-editor/js/languages/de.js';
import 'froala-editor/js/third_party/image_tui.min.js';
import 'froala-editor/js/third_party/embedly.min.js';

//create props type 
type confType = {
    setModelContent: React.Dispatch<React.SetStateAction<string>>;
}
function TextEditor(props:confType) {
    const [model, setModel] = useState<string>('');
    useEffect(()=>{
        props.setModelContent(model)
    },[model])

    Froalaeditor.DefineIcon("codeBlock", {
        NAME: "codeBlock",
        SVG_KEY: "codeView",
    });
    Froalaeditor.RegisterCommand("codeBlock", {
        title: "codeBlock",
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function () {
          this.html.set(
            this.html.get().replace(/&nbsp;&nbsp;/g, "<br/>&nbsp;&nbsp;"),
          );
        },
    });
      
  return (
    <Box className="max-w-auto mx-auto p-6 bg-white shadow-lg rounded-md">
      {/* Froala Editor */}
      <Box
        className="border p-4 rounded-md mt-4"
      >
        <FroalaEditorComponent
            model={model}
            onModelChange={(e:string)=>setModel(e)}
            config={{
                saveInterval: 10000,
                placeholderText: 'Write your question ...',
                charCounterCount: true,
                toolbarButtons:{
                    moreText: {
                        'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
                    },
                    moreParagraph: {
                        'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
                    },
                    moreRich: {
                        'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']
                    },
                    moreMisc: {
                        'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
                        'align': 'right',

                    },
                },
                events:{
                    "save.before":function(html:string){
                        localStorage.setItem("draftText",html)
                    }
                }
            }}
            tag="textarea"
        />
      </Box>
    </Box>
  )
}

export default TextEditor